/**
 * Reloads all YouTube tabs.
 */
function reloadYouTubeTabs() {
    chrome.tabs.query({ url: "*://*.youtube.com/*" }, function (tabs) {
        for (let tab of tabs) {
            chrome.tabs.reload(tab.id);
        }
    });
}

/**
 * Toggles "Only Educational Mode" and updates storage.
 * Reloads YouTube tabs to apply the change.
 */
document.getElementById("toggle-educational-mode").addEventListener("click", () => {
    chrome.storage.sync.get({ onlyEducationalMode: false }, (result) => {
        const newState = !result.onlyEducationalMode;
        chrome.storage.sync.set({ onlyEducationalMode: newState }, () => {
            document.getElementById("toggle-educational-mode").textContent = newState
                ? "Disable Educational Mode"
                : "Enable Educational Mode";
            reloadYouTubeTabs(); // Reload YouTube tabs to apply changes
        });

        // Notify background.js to update state
        chrome.runtime.sendMessage({ action: "toggleEducationalMode", state: newState });
    });
});

/**
 * Updates the toggle button text based on "Only Educational Mode" state.
 */
function updateToggleButton() {
    chrome.storage.sync.get({ onlyEducationalMode: false }, (result) => {
        document.getElementById("toggle-educational-mode").textContent =
            result.onlyEducationalMode ? "Disable Educational Mode" : "Enable Educational Mode";
    });
}

/**
 * Initializes the popup by updating the toggle button state.
 */
document.addEventListener("DOMContentLoaded", () => {
    updateToggleButton();
});
