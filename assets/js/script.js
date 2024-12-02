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
            data.splice(index, 1); // Remove from memory
            renderUserList(); // Re-render the list
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
    weighInContent.innerHTML = ""; // Clear the content first
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
        e.preventDefault(); // Prevent default form submission behavior
        
        // Collect data from input fields by their IDs
        const entry = {
            firstName: document.getElementById("first-name").value.trim(),
            lastName: document.getElementById("last-name").value.trim(),
            age: parseFloat(document.getElementById("age").value.trim(), 10),
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
});
