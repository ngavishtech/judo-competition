// In-memory data storage
let athletes = [];
let settingsRanges = [
    { ageMin: 2010, ageMax: 2011, weightMin: 50, weightMax: 54.99, gender: "Male" },
    { ageMin: 2010, ageMax: 2011, weightMin: 55, weightMax: 59.99, gender: "Male" },
    { ageMin: 2012, ageMax: 2013, weightMin: 55, weightMax: 59.99, gender: "Male" },
];

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

const addData = (entry) => {
    athletes.push(entry);
    renderGroups(athletes);
    renderUserList(athletes);
};

const deleteUser = (index) => {
    athletes.splice(index, 1); // Remove the user from the array
    renderGroups(athletes); // Re-render groups after deletion
    renderUserList(athletes); // Re-render the user list
};

const renderUserList = (athletesList) => {
    const athleteList = document.getElementById("user-list");
    athleteList.innerHTML = "";

    athletesList.forEach((entry, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${entry.firstName} ${entry.lastName} (${entry.gender}) - Birth Year: ${entry.age}, Weight: ${entry.weight} KG
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", () => {
            deleteUser(index);
        });

        athleteList.appendChild(li);
    });
};

const renderGroups = (athletesList) => {
    const groupedData = {};

    athletesList.forEach(entry => {
        if (!entry.weight || isNaN(entry.weight)) {
            if (!groupedData["TO BE WEIGHTED"]) {
                groupedData["TO BE WEIGHTED"] = [];
            }
            groupedData["TO BE WEIGHTED"].push(entry);
            return;
        }

        const group = settingsRanges.find(
            r => entry.age >= r.ageMin && entry.age <= r.ageMax &&
                entry.weight >= r.weightMin && entry.weight <= r.weightMax &&
                entry.gender === r.gender
        );

        if (group) {
            const groupKey = `${group.gender} | Birth Year (${group.ageMin}-${group.ageMax}) | Weight (${group.weightMin}-${group.weightMax} KG)`;
            if (!groupedData[groupKey]) groupedData[groupKey] = [];
            groupedData[groupKey].push(entry);
        }
    });

    const weighInContent = document.getElementById("grouped-view");
    weighInContent.innerHTML = "";
    Object.keys(groupedData).forEach(group => {
        const groupEl = document.createElement("div");
        groupEl.innerHTML = `<strong>${group}</strong><ul>${groupedData[group].map(e => `<li>${e.firstName} ${e.lastName} (${e.age}, ${e.weight}, ${e.rank})</li>`).join("")}</ul>`;
        weighInContent.appendChild(groupEl);
    });
};

const filterAthletes = (searchTerm) => {
    const filteredAthletes = athletes.filter(athlete =>
        athlete.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.age === parseInt(searchTerm) ||
        athlete.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.coachName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        athlete.weight === parseFloat(searchTerm) ||
        athlete.payment === searchTerm ||
        athlete.comments.toLowerCase().includes(searchTerm.toLowerCase())
    );

    renderUserList(filteredAthletes)
    renderGroups(filteredAthletes)
};

document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabs button");
    const tabContents = document.querySelectorAll(".tab-content");
    const registrationForm = document.getElementById("registration-form");
    const settingsForm = document.getElementById("settings-form");
    const settingsList = document.getElementById("settings-list");
    const refreshWeighIn = document.getElementById("weigh-in-refresh-button");
    const searchWeighIn = document.getElementById("weigh-in-search");
    const refreshRegistration = document.getElementById("registration-refresh-button");
    const searchRegistration = document.getElementById("registration-search");

    // Tab switching logic
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            tab.classList.add("active");
            document.getElementById(tab.dataset.tab).classList.add("active");
        });
    });

    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        const entry = {
            firstName: document.getElementById("first-name").value.trim(),
            lastName: document.getElementById("last-name").value.trim(),
            gender: document.getElementById("gender").value.trim(),
            age: parseFloat(document.getElementById("age").value.trim()),
            grade: document.getElementById("grade").value.trim(),
            rank: document.getElementById("rank").value.trim(),
            branch: document.getElementById("branch").value.trim(),
            coachName: document.getElementById("coach-name").value.trim(),
            weight: parseFloat(document.getElementById("weight").value.trim()),
            payment: document.getElementById("payment").value.trim(),
            comments: document.getElementById("comments").value.trim(),
        };

        addData(entry);
        registrationForm.reset();
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

    refreshWeighIn.addEventListener("click", () => {
        renderGroups(athletes);
    });

    refreshRegistration.addEventListener("click", () => {
        renderUserList(athletes);
    });

    searchRegistration.addEventListener("input", (event) => {
        filterAthletes(event.target.value);
    });

    searchWeighIn.addEventListener("input", (event) => {
        filterAthletes(event.target.value);
    });
});

