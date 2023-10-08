"use client"

import React, { useState, useEffect } from "react";

const Annotation = () => {
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
        <div>
            <style>
                {`
          body {
            background-color: lightblue;
          }
        `}
            </style>

            <div style={{ padding: "20px", backgroundColor: "lilac" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {videoURL ? (
                        <video width="900" height="600" controls>
                            <source src={videoURL} type="video/mp4" />
                        </video>
                    ) : (
                        <p>No video available</p>
                    )}
                </div>

                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "0 0 20px 20px",
                        padding: "10px",
                        height: "200px",
                        width: "900px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "10px",
                    }}
                >
                    {transcription}
                </div>
            </div>


        </div>
    );
};

export default Annotation;








