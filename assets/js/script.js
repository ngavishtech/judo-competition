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

const addAthlete = (entry) => {
    athletes.push(entry);
    renderGroups(athletes);
    renderUserList(athletes);
};

const deleteAthlete = (index) => {
    athletes.splice(index, 1);
    renderGroups(athletes);
    renderUserList(athletes);
};

const editAthletePopup = (index) => {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <label>Edit Athlete</label>
            <label for="first-name-edit">First Name</label><input type="text" id="first-name-edit" value="${athletes[index].firstName || ""}" required>
            <label for="last-name-edit">Last Name</label><input type="text" id="last-name-edit" value="${athletes[index].lastName || ""}" required>
            <label for="gender-edit">Gender</label>
            <select id="gender-edit" required>
                <option value="" disabled ${!athletes[index].gender ? "selected" : ""}></option>
                <option value="Male" ${athletes[index].gender === "Male" ? "selected" : ""}>Male</option>
                <option value="Female" ${athletes[index].gender === "Female" ? "selected" : ""}>Female</option>
            </select>
            <label for="age-edit">Birth Year</label><input type="number" step="0.5" id="age-edit" value="${athletes[index].age || 0}" required>
            <label for="grade-edit">Grade/Class</label><input type="text" id="grade-edit" value="${athletes[index].grade || ""}" required>
            <label for="rank-edit">Rank/Belt</label><input type="text" id="rank-edit" value="${athletes[index].rank || ""}" >
            <label for="branch-edit">Branch/City</label><input type="text" id="branch-edit" value="${athletes[index].branch || ""}" required>
            <label for="coach-name-edit">Coach Name</label><input type="text" id="coach-name-edit" value="${athletes[index].coachName || ""}" required>
            <label for="weight-edit">Weight (KG)</label><input type="number" step="0.01" id="weight-edit" value="${athletes[index].weight || 0}">
            <label for="payment-edit">Payment Details</label><input type="text" id="payment-edit" value="${athletes[index].payment || ""}">
            <label for="comments-edit">Comments</label><textarea id="comments-edit">${athletes[index].comments}</textarea>
                        
            <button id="edit-athlete-save-btn">Save</button>
            <button id="edit-athlete-cancel-btn">Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Save the changes
    document.getElementById('edit-athlete-save-btn').addEventListener('click', () => {
        athletes[index] = {
            firstName: document.getElementById("first-name-edit").value.trim(),
            lastName: document.getElementById("last-name-edit").value.trim(),
            gender: document.getElementById("gender-edit").value.trim(),
            age: parseFloat(document.getElementById("age-edit").value.trim()),
            grade: document.getElementById("grade-edit").value.trim(),
            rank: document.getElementById("rank-edit").value.trim(),
            branch: document.getElementById("branch-edit").value.trim(),
            coachName: document.getElementById("coach-name-edit").value.trim(),
            weight: parseFloat(document.getElementById("weight-edit").value.trim()),
            payment: document.getElementById("payment-edit").value.trim(),
            comments: document.getElementById("comments-edit").value.trim(),
        };
        document.body.removeChild(popup);
        renderGroups(athletes);
        renderUserList(athletes);
    });

    // Close the popup without saving
    document.getElementById('edit-athlete-cancel-btn').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
};

const editWeightPopup = (index, weight) => {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <label>Edit Athlete Weight</label>
            <input type="number" step="0.01" id="edit-weight-input" value="${weight}">
            <button id="save-btn">Save</button>
            <button id="cancel-btn">Cancel</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Save the changes
    document.getElementById('save-btn').addEventListener('click', () => {
        athletes[index].weight = document.getElementById('edit-weight-input').value.trim();
        document.body.removeChild(popup);
        renderGroups(athletes);
        renderUserList(athletes);
    });

    // Close the popup without saving
    document.getElementById('cancel-btn').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
};

const renderUserList = (athletesList) => {
    const athleteList = document.getElementById("user-list");
    athleteList.innerHTML = "";

    athletesList.forEach((entry, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${entry.firstName} ${entry.lastName} (${entry.gender}) - Birth Year: ${entry.age}, Weight: ${entry.weight} KG
            <button class="edit-weight-btn" data-index="${index}">Edit Weight</button>
            <button class="edit-btn" data-index="${index}">Edit Athlete</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", () => {
            deleteAthlete(index);
        });
        li.querySelector(".edit-btn").addEventListener("click", () => {
            editAthletePopup(index);
        });
        li.querySelector(".edit-weight-btn").addEventListener("click", () => {
            editWeightPopup(index, entry.weight)
        })

        athleteList.appendChild(li);
    });
};

const renderGroups = (athletesList) => {
    const groupedData = {};

    athletesList.forEach((entry) => {
        if (!entry.weight || isNaN(entry.weight)) {
            const groupKey = "TO BE WEIGHTED";
            groupedData[groupKey] = groupedData[groupKey] || [];
            groupedData[groupKey].push(entry);
            return;
        }

        const group = settingsRanges.find(
            r => entry.age >= r.ageMin && entry.age <= r.ageMax &&
                entry.weight >= r.weightMin && entry.weight <= r.weightMax &&
                entry.gender === r.gender
        );

        if (group) {
            const groupKey = `${group.gender} | Birth Year (${group.ageMin}-${group.ageMax}) | Weight (${group.weightMin}-${group.weightMax} KG)`;
            groupedData[groupKey] = groupedData[groupKey] || [];
            groupedData[groupKey].push(entry);
        } else {
            const groupKey = "NO MATCHING GROUP";
            groupedData[groupKey] = groupedData[groupKey] || [];
            groupedData[groupKey].push(entry);
        }
    });

    const weighInContent = document.getElementById("grouped-view");
    weighInContent.innerHTML = "";

    Object.keys(groupedData).forEach((group) => {
        const groupEl = document.createElement("div");
        groupEl.innerHTML = `
        <strong>${group} |<->| Count (${groupedData[group].length})</strong>
        <ul>
            ${groupedData[group]
            .map(
                e => `<li>
                        <input type="checkbox" data-athlete-id="${e.id}" />
                        ${e.firstName} ${e.lastName} (${e.age}, ${e.weight}, ${e.rank})
                        <button class="edit-weight-btn" data-index="${athletesList.indexOf(e)}">Edit Weight</button>
                    </li>`
            )
            .join("")}
        </ul>
        `;
        groupEl.classList.add("group");
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
    const editWeightWeighIn = document.getElementById("grouped-view");

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

        addAthlete(entry);
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

    editWeightWeighIn.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-weight-btn")) {
            const index = parseInt(event.target.dataset.index, 10);
            const weight = athletes[index]?.weight || 0;
            editWeightPopup(index, weight);
        }
    });
});

