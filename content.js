// Check if "Only Educational Mode" is enabled
chrome.storage.sync.get({ onlyEducationalMode: false }, (result) => {
    if (result.onlyEducationalMode) {
        console.log("🔵 Only Educational Mode is ENABLED");
        observeYouTube();
    } else {
        console.log("⚪ Only Educational Mode is DISABLED");
    }
});

/**
 * Observes changes in the YouTube video list and triggers filtering.
 */
function observeYouTube() {
    const observer = new MutationObserver(() => processVideos());
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check for already loaded videos
    processVideos();
}

/**
 * Extracts video titles and metadata from the YouTube page.
 * @returns {Array} List of video objects with title and description.
 */
function getVideosFromPage() {
    const videos = document.querySelectorAll("ytd-video-renderer, ytd-rich-item-renderer");
    let videoData = [];

    videos.forEach((video) => {
        let titleElement = video.querySelector("#video-title");
        let descriptionElement = video.querySelector("#description-text");

        let title = titleElement ? titleElement.innerText.toLowerCase() : "";
        let description = descriptionElement ? descriptionElement.innerText.toLowerCase() : "";

        videoData.push({ element: video, title, description });
    });

    return videoData;
}

/**
 * Filters videos based on educational content.
 */
function processVideos() {
    const videos = getVideosFromPage();
    console.log("🔍 Found", videos.length, "videos. Filtering...");

    videos.forEach((video) => {
        if (!isEducational(video.title, video.description)) {
            console.log("❌ Hiding:", video.title);
            video.element.style.display = "none";
        } else {
            console.log("✅ Allowed:", video.title);
        }
    });
}

/**
 * Checks if a video is educational using rule-based filtering.
 * @param {string} title - Video title
 * @param {string} description - Video description
 * @returns {boolean} True if educational, false otherwise
 */
function isEducational(title, description) {
    const educationalKeywords = [
        "math", "science", "history", "tutorial", "education",
        "physics", "chemistry", "biology", "engineering",
        "programming", "coding", "computer science", "lecture",
        "exam prep", "study", "learning", "course", "how to",
        "university", "AI", "machine learning", "data science"
    ];

    const trustedChannels = [
        "khan academy", "ted-ed", "veritasium", "nptel", 
        "mit ocw", "cs50", "crashcourse", "edureka", 
        "coursera", "udacity", "stanford online", "harvard"
    ];

    // Check if title or description contains educational keywords
    if (educationalKeywords.some((kw) => title.includes(kw) || description.includes(kw))) {
        return true;
    }

    // Check if the video is from a trusted channel
    if (trustedChannels.some((channel) => title.includes(channel) || description.includes(channel))) {
        return true;
    }

    return false;
}
