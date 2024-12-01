// In-Memory Data Storage
const dataStore = [];
const defaultAgeRanges = ["2010-2011", "2012-2013"];
const defaultWeightRanges = [50, 55, 60, 65];

// Tab Switching Logic
document.querySelectorAll(".tabs button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".tabs button").forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

        button.classList.add("active");
        document.getElementById(button.dataset.tab).classList.add("active");
    });
});

// Form Submission Logic
document.getElementById("registration-form").addEventListener("submit", event => {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        age: parseInt(document.getElementById("age").value, 10),
        rank: document.getElementById("rank").value,
        branch: document.getElementById("branch").value,
        trainerName: document.getElementById("trainer-name").value,
        weight: parseFloat(document.getElementById("weight").value),
        payment: document.getElementById("payment").value,
        comments: document.getElementById("comments").value
    };

    dataStore.push(formData);
    alert("Registration submitted!");
    event.target.reset();
});

// Dynamic Search and Grouped View
document.getElementById("search").addEventListener("input", event => {
    const searchQuery = event.target.value.toLowerCase();
    const results = dataStore.filter(item =>
        item.firstName.toLowerCase().includes(searchQuery) ||
        item.lastName.toLowerCase().includes(searchQuery) ||
        item.rank.toLowerCase().includes(searchQuery)
    );
    renderSearchResults(results);
});

function renderSearchResults(results) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = results.length
        ? results.map(item => `<div>${item.firstName} ${item.lastName} - ${item.rank}</div>`).join("")
        : "<p>No results found.</p>";
}

function renderGroupedView() {
    const groupedContainer = document.getElementById("grouped-view");
    groupedContainer.innerHTML = "";

    const ageGroups = groupBy(dataStore, "age", defaultAgeRanges);
    for (const [ageRange, group] of Object.entries(ageGroups)) {
        const weightGroups = groupBy(group, "weight", defaultWeightRanges);
        groupedContainer.innerHTML += `<h3>Age Group: ${ageRange}</h3>`;
        for (const [weightRange, weightGroup] of Object.entries(weightGroups)) {
            groupedContainer.innerHTML += `<p>Weight Group: ${weightRange}kg</p>`;
            groupedContainer.innerHTML += `<ul>${weightGroup.map(item => `<li>${item.firstName} ${item.lastName}</li>`).join("")}</ul>`;
        }
    }
}

function groupBy(data, key, ranges) {
    const groups = {};
    for (const item of data) {
        const value = item[key];
        const range = ranges.find((_, i) => value >= ranges[i] && value < (ranges[i + 1] || Infinity));
        const rangeLabel = range ? `${range}-${ranges[ranges.indexOf(range) + 1] - 0.01}` : "Other";
        if (!groups[rangeLabel]) groups[rangeLabel] = [];
        groups[rangeLabel].push(item);
    }
    return groups;
}

// Update Grouped View whenever new data is added
setInterval(renderGroupedView, 1000);
