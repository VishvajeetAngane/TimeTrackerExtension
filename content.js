const productiveSites = ["github.com", "stackoverflow.com", "leetcode.com"];
const unproductiveSites = ["facebook.com", "instagram.com", "youtube.com"];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProductivity") {
        let site = new URL(window.location.href).hostname;
        let category = "Neutral";

        if (productiveSites.includes(site)) category = "Productive";
        if (unproductiveSites.includes(site)) category = "Unproductive";

        sendResponse({ site, category });
    }
});
