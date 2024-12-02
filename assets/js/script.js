// In-memory data storage
const data = [];

// Example default ranges (can be configured)
const ageRanges = [{ min: 2010, max: 2011 }, { min: 2012, max: 2013 }];
const weightRanges = [{ min: 50, max: 54.99 }, { min: 55, max: 59.99 }];

/**
 * Function to add data entry
 * @param {Object} entry - The new data entry to add
 */
const addData = (entry) => {
    data.push(entry);
    renderGroups();
};

/**
 * Function to group and render data
 */
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

    // Render grouped data in the "Weigh-In" tab
    const weighInContent = document.getElementById("weigh-in");
    weighInContent.innerHTML = "<h3>Grouped Data</h3>";
    Object.keys(groupedData).forEach(group => {
        const groupEl = document.createElement("div");
        groupEl.innerHTML = `<strong>${group}</strong><ul>${groupedData[group].map(e => `<li>${e.firstName} ${e.lastName}</li>`).join("")}</ul>`;
        weighInContent.appendChild(groupEl);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabs button");
    const tabContents = document.querySelectorAll(".tab-content");
    const registrationForm = document.getElementById("registration-form");

    // Tab switching logic
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    // Form submission logic
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(registrationForm);

        // Create an entry object from form data
        const entry = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            age: parseInt(formData.get("age"), 10),
            rank: formData.get("rank"),
            branch: formData.get("branch"),
            trainerName: formData.get("trainerName"),
            weight: parseFloat(formData.get("weight")),
            payment: formData.get("payment"),
            comments: formData.get("comments"),
        };

        addData(entry); // Call the generalized addData function
        registrationForm.reset(); // Clear the form
    });
});
