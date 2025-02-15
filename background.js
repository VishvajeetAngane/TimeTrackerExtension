let activeTabId = null;
let startTime = null;
let timeSpent = {};

chrome.tabs.onActivated.addListener(activeInfo => {
    updateTimeSpent();
    activeTabId = activeInfo.tabId;
    startTime = new Date();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === "complete") {
        updateTimeSpent();
        activeTabId = tabId;
        startTime = new Date();
    }
});

chrome.tabs.onRemoved.addListener(tabId => {
    if (tabId === activeTabId) {
        updateTimeSpent();
        activeTabId = null;
        startTime = null;
    }
});

function updateTimeSpent() {
    if (activeTabId && startTime) {
        let endTime = new Date();
        let elapsedTime = (endTime - startTime) / 1000; // Convert to seconds

        chrome.tabs.get(activeTabId, function (tab) {
            if (chrome.runtime.lastError || !tab || !tab.url) return;

            let url = new URL(tab.url).hostname;
            timeSpent[url] = (timeSpent[url] || 0) + elapsedTime;

            chrome.storage.local.set({ timeSpent });
        });
    }
}
