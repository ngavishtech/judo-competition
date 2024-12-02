// In-memory data storage
const data = [];

// Define default age and weight ranges for settings
let settingsRanges = [
    { ageMin: 2010, ageMax: 2011, weightMin: 50, weightMax: 54.99, gender: "Male" },
    { ageMin: 2011, ageMax: 2012, weightMin: 55, weightMax: 59.99, gender: "Male" },
];


// Render settings for age and weight ranges
const renderSettingsList = () => {
    const settingsList = document.getElementById("settings-list");
    settingsList.innerHTML = "";

    settingsRanges.forEach((range, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            Birth Year: ${range.ageMin}-${range.ageMax}, 
            Weight (KG): ${range.weightMin}-${range.weightMax}, 
            Gender: ${range.gender}
            <button class="delete-btn" data-index="${index}">Delete</button>`;
        li.querySelector(".delete-btn").addEventListener("click", () => {
            removeSetting(index);
        });
        settingsList.appendChild(li);
    });
};

const removeSetting = (index) => {
    settingsRanges.splice(index, 1);
    renderSettingsList();
};

/**
 * Function to add data entry
 * @param {Object} entry - The new data entry to add
 */
const addData = (entry) => {
    data.push(entry);
    renderGroups();
    renderUserList();
};

// Function to delete a user
const deleteUser = (index) => {
    data.splice(index, 1); // Remove the user from the array
    renderGroups(); // Re-render groups after deletion
    renderUserList(); // Re-render the user list
};

// Function to render the user list
const renderUserList = () => {
    const userList = document.getElementById("user-list");
    userList.innerHTML = ""; // Clear the list first

    data.forEach((entry, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${entry.firstName} ${entry.lastName} - Age: ${entry.age}, Weight: ${entry.weight} kg
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        // Add delete functionality
        li.querySelector(".delete-btn").addEventListener("click", () => {
            deleteUser(index);
        });

        userList.appendChild(li);
    });
};

/**
 * Function to group and render data
 */
const renderGroups = () => {
    const groupedData = {};

    data.forEach(entry => {
        const group = settingsRanges.find(
            r => entry.age >= r.ageMin && entry.age <= r.ageMax &&
                entry.weight >= r.weightMin && entry.weight <= r.weightMax &&
                entry.gender === r.gender
        );

        if (group) {
            const groupKey = `${group.ageMin}-${group.ageMax} | ${group.weightMin}-${group.weightMax} | ${group.gender}`;
            if (!groupedData[groupKey]) groupedData[groupKey] = [];
            groupedData[groupKey].push(entry);
        }
    });

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
    const settingsForm = document.getElementById("settings-form");
    const settingsList = document.getElementById("settings-list");

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
        e.preventDefault(); // Prevent default form submission behavior
        
        // Collect data from input fields by their IDs
        const entry = {
            firstName: document.getElementById("first-name").value.trim(),
            lastName: document.getElementById("last-name").value.trim(),
            age: parseFloat(document.getElementById("age").value.trim()),
            grade: document.getElementById("grade").value.trim(),
            rank: document.getElementById("rank").value.trim(),
            branch: document.getElementById("branch").value.trim(),
            trainerName: document.getElementById("trainer-name").value.trim(),
            weight: parseFloat(document.getElementById("weight").value.trim()),
            payment: document.getElementById("payment").value.trim(),
            comments: document.getElementById("comments").value.trim(),
        };

        // Validate required fields
        if (!entry.firstName || !entry.lastName || isNaN(entry.age) || isNaN(entry.weight)) {
            alert("Please fill out all required fields (First Name, Last Name, Age, Weight).");
            return;
        }

        addData(entry); // Add the data to the list
        registrationForm.reset(); // Clear the form after submission
    });

    settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newAgeFrom = parseInt(document.getElementById("new-age-from").value);
        const newAgeTo = parseInt(document.getElementById("new-age-to").value);
        const newWeightFrom = parseFloat(document.getElementById("new-weight-from").value);
        const newWeightTo = parseFloat(document.getElementById("new-weight-to").value);
        const newGender = document.getElementById("new-gender").value; // Dropdown or radio

        if (newAgeFrom && newAgeTo && newWeightFrom && newWeightTo && newGender) {
            settingsRanges.push({ ageMin: newAgeFrom, ageMax: newAgeTo, weightMin: newWeightFrom, weightMax: newWeightTo, gender: newGender });
        }
        renderSettingsList();
        settingsForm.reset();
    });
});

