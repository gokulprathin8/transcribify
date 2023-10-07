import concurrent.futures
import boto3
import uuid
import time

# Function to transcribe a video with a given job name
def transcribe_video(video_url, job_name):
    transcribe = boto3.client('transcribe', region_name='us-east-1')  # Replace 'your_region' with your AWS region

    # Specify the language of the video (optional, e.g., 'en-US' for US English)
    language_code = 'en-US'

    # Specify the output S3 bucket and prefix where the transcription results will be stored
    output_bucket = 'gmu-hackathon-devbucket0g33v4'  # Replace with your S3 bucket name
    output_prefix = 'transcriptions/'  # Replace with your desired prefix

    # Create a Transcribe job
    response = transcribe.start_transcription_job(
        TranscriptionJobName=job_name,
        Media={'MediaFileUri': video_url},
        MediaFormat='mp4',  # Change this format according to your video format
        LanguageCode=language_code,
        OutputBucketName=output_bucket,
        OutputKey=output_prefix + job_name + '.txt',  # Change the extension to '.txt' if you want plain text output
    )

    # Poll the job status until it's completed
    while True:
        response = transcribe.get_transcription_job(TranscriptionJobName=job_name)
        job_status = response['TranscriptionJob']['TranscriptionJobStatus']

        if job_status in ['COMPLETED', 'FAILED']:
            break

        print(f"Transcription job {job_name} status: {job_status}")
        time.sleep(30)  # Wait for 30 seconds before checking again

    if job_status == 'COMPLETED':
        transcription_url = response['TranscriptionJob']['Transcript']['TranscriptFileUri']

        # Download and return the transcription
        import requests
        transcription_json = requests.get(transcription_url).json()
        transcription_text = transcription_json['results']['transcripts'][0]['transcript']

        return job_name, transcription_text

    else:
        print(f"Transcription job {job_name} failed.")
        return job_name, None

# Define the URLs of the videos you want to transcribe
video_urls = [
    'https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/test.mp4',
    'https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/TED_sample1.mp4',
    'https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/TED_sample2.mp4',
    # Add more video URLs as needed
]

# Create unique job names for each video using UUIDs
job_names = [f'transcription-job-{str(uuid.uuid4())}' for _ in video_urls]

# Create a ThreadPoolExecutor to run transcription jobs in parallel
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Start transcription jobs for each video in parallel
    future_to_url = {executor.submit(transcribe_video, url, job_name): url for url, job_name in zip(video_urls, job_names)}

    # Retrieve results as they complete
    for future in concurrent.futures.as_completed(future_to_url):
        video_url = future_to_url[future]
        job_name, transcription_text = future.result()

        if transcription_text is not None:
            print(f"Transcription for video URL '{video_url}' (Job Name: {job_name}):\n{transcription_text}\n")
        else:
            print(f"Transcription job for video URL '{video_url}' (Job Name: {job_name}) failed.\n")
