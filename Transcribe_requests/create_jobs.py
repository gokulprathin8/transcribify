import boto3
import uuid

# Function to create a Transcribe job
def create_transcription_job(video_url):
    transcribe = boto3.client('transcribe', region_name='us-east-1')  # Replace 'your_region' with your AWS region

    # Generate a unique job name by appending a UUID
    job_name = 'transcription-job-name-' + str(uuid.uuid4())  # Append a UUID to the job name

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
        Settings={'LanguageOptions': ['auto']},
        OutputBucketName=output_bucket,
        OutputKey=output_prefix + job_name + '.txt',  # Change the extension to '.txt' if you want plain text output
    )

    return job_name

if __name__ == "__main__":
    # Define the URLs of the videos you want to transcribe
    video_urls = [
        'https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/test.mp4',
        'https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/TED_sample1.mp4',
        'https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/TED_sample2.mp4',
        'https://gmu-hackathon-devbucket0g33v4.s3.amazonaws.com/TED_sample_telugu1.mp4'

        # Add more video URLs as needed
    ]

    uuids = []

    # Create unique job names for each video using UUIDs and print them
    for video_url in video_urls:
        job_name = create_transcription_job(video_url)
        uuid_part = job_name.split('transcription-job-name-')[-1]
        uuids.append(uuid_part)
        print(f"UUID: {uuid_part}, Job Name: {job_name}")
    
    print("List of UUIDs:", uuids)
