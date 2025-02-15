chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab.url || !tab.url.includes("youtube.com/watch")) return;

    if (changeInfo.status === "complete") {
        fetch(`http://localhost:5000/analyze?video=${encodeURIComponent(tab.url)}`)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data.category === "distracting") {
                    chrome.scripting.executeScript({
                        target: { tabId: tabId },
                        func: () => {
                            let video = document.querySelector("video");
                            if (video) {
                                video.style.filter = "blur(10px)";
                            }
                        }
                    });
                }
            })
            .catch(error => console.error("Error fetching video classification:", error));
    }
});
