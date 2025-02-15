chrome.storage.local.get("timeSpent", function (data) {
    let report = document.getElementById("report");
    let timeSpent = data.timeSpent || {};

    Object.entries(timeSpent).forEach(([site, seconds]) => {
        let li = document.createElement("li");
        li.textContent = `${site}: ${Math.round(seconds / 60)} min`;

        chrome.runtime.sendMessage({ action: "getProductivity" }, response => {
            if (response.site === site) {
                if (response.category === "Productive") li.classList.add("productive");
                if (response.category === "Unproductive") li.classList.add("unproductive");
            }
        });

        report.appendChild(li);
    });
});
