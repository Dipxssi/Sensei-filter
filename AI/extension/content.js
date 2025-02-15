chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "blur") {
        let video = document.querySelector("video");
        if (video) {
            video.style.filter = "blur(10px)";
        }
    }
});
