// Fetches keywords from a website API and updates Chrome storage
async function fetchKeywords() {
    try {
        const apiKey = "AIzaSyDOcb-MmX495o2qYbZTIPWOJwAGV9BY9jw"; // Replace with a secure method
        const response = await fetch(`https://console.cloud.google.com/welcome?hl=en&project=extension-450816?key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.keywords) {
            throw new Error("Invalid response: 'keywords' field missing.");
        }

        // Store fetched keywords in Chrome storage
        chrome.storage.sync.set({ keywords: data.keywords });

    } catch (error) {
        console.error("Error fetching keywords:", error);
    }
}

// Sync keywords every hour
setInterval(fetchKeywords, 60 * 60 * 1000); // 1 hour

// Listen for updates from popup.html or website
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateKeywords") {
        chrome.storage.sync.set({ keywords: request.keywords }, () => {
            sendResponse({ status: "success" });
        });
    }
    return true;
});

// Send updated keywords to content.js when storage changes
chrome.storage.onChanged.addListener((changes) => {
    if (changes.keywords) {
        chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (newKeywords) => {
                        window.postMessage({ type: "updateKeywords", keywords: newKeywords }, "*");
                    },
                    args: [changes.keywords.newValue]
                }).catch(err => console.error("Script execution error:", err));
            });
        });
    }
});
