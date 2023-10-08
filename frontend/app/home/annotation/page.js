"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";

const HomePageContainer = styled.div`
  padding: 30px;
  background-color: #b8d3ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; // Ensuring it utilizes the full width
  height: calc(100vh - 60px);
  box-sizing: border-box; // Ensure padding doesn't expand width
`;

const EmbedContainer = styled.div`
position: relative;
width: 100%;
padding-bottom: 56.25%; // 16:9 aspect ratio
background-color: #ccc;
overflow: hidden;
margin-bottom: 50px;
transform: scale(0.67); // Scaling both width and height by 2/3
margin-left: auto;
margin-right: auto;

  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
`;

const TranscriptContainer = styled.div`
  background-color: white;
  width: 100%;
  max-width: 1000px; // Limiting maximum width for larger screens
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 30px;
  box-sizing: border-box;
`;

const MOMContainer = styled.div`
  background-color: white;
  width: 100%;
  padding: 15px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MOMContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const MOMSummary = styled.div`
  background-color: white;
  flex: 1;
  padding: 15px;
  border-right: 1px solid #ddd;
`;

const MOMGraph = styled.div`
  flex: 1;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MOMHeading = styled.h1`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const IconContainer = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const GraphPlaceholder = styled.div`
  background-color: #ccc;
  height: 200px;
  width: 100%;
`;


const HomePage = () => {
    const [videoURL, setVideoURL] = useState(
      "https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/test.mp4"
    );
    const [transcription, setTranscription] = useState("");
  
    useEffect(() => {
      const fetchTranscriptionData = async () => {
        try {
          const response = await fetch("/api/getTranscription");
          if (response.ok) {
            const transcriptionData = await response.text();
            setTranscription(transcriptionData);
          } else {
            console.error("Failed to fetch transcription data");
          }
        } catch (error) {
          console.error("Error fetching transcription data:", error);
        }
      };
  
      fetchTranscriptionData();
    }, []);
  
    return (
      <HomePageContainer>
        <EmbedContainer>
          {videoURL ? (
            <video width="100%" height="100%" controls>
              <source src={videoURL} type="video/mp4" />
            </video>
          ) : (
            <p>No video available</p>
          )}
        </EmbedContainer>
        <TranscriptContainer>{transcription}</TranscriptContainer>
        <MOMContainer>
          <MOMHeading>
            <IconContainer>
              <UserOutlined />
            </IconContainer>
            Minutes of Meeting
          </MOMHeading>
          <MOMContent>
            <MOMSummary>
              {/* ... (rest of the content from HomePage, no changes here) */}
            </MOMSummary>
            <MOMGraph>
              <GraphPlaceholder />
            </MOMGraph>
          </MOMContent>
        </MOMContainer>
      </HomePageContainer>
    );
  };
  
  export default HomePage;