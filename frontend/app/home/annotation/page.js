"use client"

import React, { useState, useEffect } from "react";
import useAnnotationStore from "@/app/store/annotationStore";



const Annotation = () => {
    const meetingVideo = useAnnotationStore((state) => state.meetingUrl)
    const transcriptionUrl = useAnnotationStore((state) => state.transcriptionUrl)
    const [transcription, setTranscription] = useState();

    const [data, setData] = useState(null);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);
            } else {
                console.error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        const url = 'https://s3.us-east-1.amazonaws.com/gmu-hackathon-devbucket0g33v4/6cce1f69-1b71-4a4c-8756-04adcb153b0a.json';
        fetchData(url);
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
                    {meetingVideo ? (
                        <video width="900" height="600" controls>
                            <source src={meetingVideo} type="video/mp4" />
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
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "10px",
                    }}
                >

                    {
                        data ? <div>
                            <h1>Job Details</h1>
                            <p><strong>Job Name:</strong> {data.jobName}</p>
                            <p><strong>Account ID:</strong> {data.accountId}</p>
                            <p><strong>Status:</strong> {data.status}</p>

                            <hr/>

                            {data.results && data.results.transcripts && (
                                <div>
                                    {data.results.transcripts.map((t, index) => (
                                        <p key={index}>{t.transcript}</p>
                                    ))}
                                </div>
                            )}
                        </div> : <p>Loading...</p>
                    }

                </div>
            </div>


        </div>
    );
};

export default Annotation;








