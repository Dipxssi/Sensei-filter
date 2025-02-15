from flask import Flask, request, jsonify
import openai
from classify import classify_video_gpt
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/analyze")
def analyze_video():
    video_url = request.args.get("video")
    video_id = video_url.split("v=")[-1]
    category = classify_video_gpt(video_id)
    return jsonify({"category": category})

if __name__ == "__main__":
    app.run(port=5000)
