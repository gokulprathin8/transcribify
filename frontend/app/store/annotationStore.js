import create from 'zustand';
import {devtools, persist} from "zustand/middleware";


const annotationStore = (set) => ({
    meetingUrl: null,
    transcriptionUrl: null,

    setAnnotationDetails: (mUrl, tUrl) => set({
        meetingUrl: mUrl,
        transcriptionUrl: tUrl
    })
});

const useAnnotationStore = create(
    devtools(
        persist(annotationStore, {
            name: 'AnnotationStore'
        })
    )
)

export default useAnnotationStore;