import boto3

# Initialize AWS Transcribe client
transcribe = boto3.client('transcribe', region_name='us-east-1')  # Replace 'your_region' with your AWS region

# Define the URL of the video you want to transcribe
video_url = 'https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/test.mp4'  # Replace with your video URL

# Define the name of the transcription job
job_name = 'transcription-job-name'  # Replace with your desired job name

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

# Wait for the transcription job to complete
transcribe.get_waiter('transcription_job_completed').wait(TranscriptionJobName=job_name)

# Get the transcription results
response = transcribe.get_transcription_job(TranscriptionJobName=job_name)
transcription_url = response['TranscriptionJob']['Transcript']['TranscriptFileUri']

# Download and print the transcription
import requests
transcription_json = requests.get(transcription_url).json()
transcription_text = transcription_json['results']['transcripts'][0]['transcript']

print(transcription_text)
