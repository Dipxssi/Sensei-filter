import requests
import openai

API_KEY = "AIzaSyBnpXiCW30OZf5HOFYisNTVYPrbclTFvvU"
OPENAI_API_KEY = "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"


def get_video_metadata(video_id):
    url = f"https://www.googleapis.com/youtube/v3/videos?part=snippet&id={video_id}&key={API_KEY}"
    response = requests.get(url).json()
    
    if "items" in response and response["items"]:
        video_info = response["items"][0]["snippet"]
        return {
            "title": video_info["title"],
            "description": video_info["description"],
            "tags": video_info.get("tags", []),
        }
    return None

def classify_video_gpt(video_id):
    metadata = get_video_metadata(video_id)
    if not metadata:
        return "unknown"

    prompt = f"Classify the following YouTube video as 'educational' or 'distracting':\n\nTitle: {metadata['title']}\nDescription: {metadata['description']}\nTags: {', '.join(metadata['tags'])}\n\nAnswer:"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        api_key=OPENAI_API_KEY
    )
    
    return response["choices"][0]["message"]["content"].strip().lower()


