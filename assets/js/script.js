// script.js

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabs button");
    const tabContents = document.querySelectorAll(".tab-content");

    // Tab switching logic
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // In-memory data storage
    let data = [];

    // Example default ranges (can be configured)
    const ageRanges = [{ min: 2010, max: 2011 }, { min: 2012, max: 2013 }];
    const weightRanges = [{ min: 50, max: 54.99 }, { min: 55, max: 59.99 }];

    // Function to add data (simulating form submission)
    const addData = (entry) => {
        data.push(entry);
        renderGroups();
    };

    // Function to group and render data
    const renderGroups = () => {
        const groupedData = {};

        data.forEach(entry => {
            const ageGroup = ageRanges.find(r => entry.age >= r.min && entry.age <= r.max);
            const weightGroup = weightRanges.find(r => entry.weight >= r.min && entry.weight <= r.max);

            if (ageGroup && weightGroup) {
                const groupKey = `${ageGroup.min}-${ageGroup.max} | ${weightGroup.min}-${weightGroup.max}`;
                if (!groupedData[groupKey]) groupedData[groupKey] = [];
                groupedData[groupKey].push(entry);
            }
        });

        // Render grouped data
        const weighInContent = document.getElementById("weigh-in");
        weighInContent.innerHTML = "<h3>Grouped Data</h3>";
        Object.keys(groupedData).forEach(group => {
            const groupEl = document.createElement("div");
            groupEl.innerHTML = `<strong>${group}</strong><ul>${groupedData[group].map(e => `<li>${e.firstName} ${e.lastName}</li>`).join("")}</ul>`;
            weighInContent.appendChild(groupEl);
        });
    };

    // Mock form submission (to be replaced with form handling)
    addData({ firstName: "John", lastName: "Doe", age: 2011, weight: 52 });
    addData({ firstName: "Jane", lastName: "Smith", age: 2010, weight: 58 });
});
