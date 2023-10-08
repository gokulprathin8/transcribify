import boto3
import concurrent.futures
import time

# Function to fetch job status and transcription text
def fetch_transcription_status(uuid):
    job_name = f'transcription-job-name-{uuid}'
    transcribe = boto3.client('transcribe', region_name='us-east-1')  # Replace 'your_region' with your AWS region

    while True:
        response = transcribe.get_transcription_job(TranscriptionJobName=job_name)
        job_status = response['TranscriptionJob']['TranscriptionJobStatus']

        if job_status == 'COMPLETED':
            transcription_url = response['TranscriptionJob']['Transcript']['TranscriptFileUri']

            # Download and return the transcription
            import requests
            transcription_json = requests.get(transcription_url).json()
            transcription_text = transcription_json['results']['transcripts'][0]['transcript']

            return uuid, job_name, transcription_text
        elif job_status == 'FAILED':
            return uuid, job_name, None
        elif job_status == 'IN_PROGRESS':
            print(f"Transcription job {job_name} is still in progress. Sleeping for 15 seconds...")
            time.sleep(15)
        else:
            print(f"Transcription job {job_name} status: {job_status}")
            return uuid, job_name, None

if __name__ == "__main__":
    # Define the UUIDs of the transcription jobs to fetch
    job_uuids = ['ac9d17f6-015f-421c-8686-34eafbd29e84', 'b9816333-496f-4271-9795-b5044b5bc38c', '463f4231-bdf9-4399-a30e-9c0a6fec4ce5', '296b21a6-c3ee-4bfe-a663-f06e138a58b1']  # Replace with the UUIDs you want to fetch

    # Create a ThreadPoolExecutor to run transcription job fetching in parallel
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Start transcription job fetching for each UUID in parallel
        future_to_uuid = {executor.submit(fetch_transcription_status, uuid): uuid for uuid in job_uuids}

        # Retrieve results as they complete
        for future in concurrent.futures.as_completed(future_to_uuid):
            uuid = future_to_uuid[future]
            uuid_result, job_name_result, transcription_text_result = future.result()

            if transcription_text_result is not None:
                print(f"UUID: {uuid_result}, Job Name: {job_name_result}, Transcription Text:\n{transcription_text_result}\n")
            else:
                print(f"Transcription job {job_name_result} failed.\n")
