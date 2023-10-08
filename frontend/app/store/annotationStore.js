import create from 'zustand';
import {devtools, persist} from "zustand/middleware";


const annotationStore = (set) => ({
    meetingUrl: null,
    transcriptionUrl: null,
})