chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get({ onlyEducationalMode: false }, (data) => {
        if (data.onlyEducationalMode === undefined) {
            chrome.storage.sync.set({ onlyEducationalMode: false }, () => {
                console.log("Default setting: Only Educational Mode OFF.");
            });
        }
    });
});

// Listener to toggle "Only Educational Mode" from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleEducationalMode") {
        chrome.storage.sync.set({ onlyEducationalMode: message.state }, () => {
            console.log("Only Educational Mode:", message.state ? "ON" : "OFF");
            sendResponse({ success: true });
        });
        return true; // Required for async sendResponse
    }
});
