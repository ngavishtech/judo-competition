// In-memory data storage
let athletes = [];
let settingsRanges = [
    { ageMin: 2010, ageMax: 2011, weightMin: 50, weightMax: 54.99, gender: "Male" },
];

const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
            <form id="update-form" class="update-form">
                <h1>Edit Athlete</h1>
                <label for="first-name-edit">שם פרטי *</label><input type="text" id="first-name-edit" value="${athletes[index].firstName || ""}" required>
                <label for="last-name-edit">שם משפחה *</label><input type="text" id="last-name-edit" value="${athletes[index].lastName || ""}" required>
                <label for="gender-edit">מין *</label>
                <select id="gender-edit" required>
                    <option value="" disabled ${!athletes[index].gender ? "selected" : ""}></option>
                    <option value="Male" ${athletes[index].gender === "Male" ? "selected" : ""}>זכר</option>
                    <option value="Female" ${athletes[index].gender === "Female" ? "selected" : ""}>נקבה</option>
                </select>
                <label for="age-edit">שנת לידה *</label><input type="number" step="0.5" id="age-edit" value="${athletes[index].age || 0}" required>
                <label for="grade-edit">כיתה</label>
                <select id="grade-edit">
                    <option value="" disabled ${!athletes[index].grade ? "selected" : ""}></option>
                    <option value="PrePreSchool" ${athletes[index].grade === "PrePreSchool" ? "selected": ""}>ט.חובה</option>
                    <option value="PreSchool" ${athletes[index].grade === "PreSchool" ? "selected": ""}>חובה</option>
                    <option value="School1" ${athletes[index].grade === "School1" ? "selected": ""}>א</option>
                    <option value="School2" ${athletes[index].grade === "School2" ? "selected": ""}>ב</option>
                    <option value="School3" ${athletes[index].grade === "School3" ? "selected": ""}>ג</option>
                    <option value="School4" ${athletes[index].grade === "School4" ? "selected": ""}>ד</option>
                    <option value="School5" ${athletes[index].grade === "School5" ? "selected": ""}>ה</option>
                    <option value="School6" ${athletes[index].grade === "School6" ? "selected": ""}>ו</option>
                    <option value="School7" ${athletes[index].grade === "School7" ? "selected": ""}>ז</option>
                    <option value="School8" ${athletes[index].grade === "School8" ? "selected": ""}>ח</option>
                    <option value="School9" ${athletes[index].grade === "School9" ? "selected": ""}>ט</option>
                    <option value="School10" ${athletes[index].grade === "School10" ? "selected": ""}>י</option>
                    <option value="School11" ${athletes[index].grade === "School11" ? "selected": ""}>יא</option>
                    <option value="School12" ${athletes[index].grade === "School12" ? "selected": ""}>יב</option>
                </select>
                <label for="rank-edit">חגורה</label>
                <select id="rank-edit">
                    <option value="" disabled ${!athletes[index].rank ? "selected" : ""}></option>
                    <option value="לבנה" ${athletes[index].rank === "לבנה" ? "selected": ""}>לבנה</option>
                    <option value="לבנה-סגולה" ${athletes[index].rank === "לבנה-סגולה" ? "selected": ""}>לבנה-סגולה</option>
                    <option value="סגולה" ${athletes[index].rank === "סגולה" ? "selected": ""}>סגולה</option>
                    <option value="לבנה-צהובה" ${athletes[index].rank === "לבנה-צהובה" ? "selected": ""}>לבנה-צהובה</option>
                    <option value="סגולה-צהובה" ${athletes[index].rank === "סגולה-צהובה" ? "selected": ""}>סגולה-צהובה</option>
                    <option value="צהובה" ${athletes[index].rank === "צהובה" ? "selected": ""}>צהובה</option>
                    <option value="צהובה-כתומה" ${athletes[index].rank === "צהובה-כתומה" ? "selected": ""}>צהובה-כתומה</option>
                    <option value="כתומה" ${athletes[index].rank === "כתומה" ? "selected": ""}>כתומה</option>
                    <option value="כתומה-ירוקה" ${athletes[index].rank === "כתומה-ירוקה" ? "selected": ""}>כתומה-ירוקה</option>
                    <option value="ירוקה" ${athletes[index].rank === "ירוקה" ? "selected": ""}>ירוקה</option>
                    <option value="ירוקה-כחולה" ${athletes[index].rank === "ירוקה-כחולה" ? "selected": ""}>ירוקה-כחולה</option>
                    <option value="כחולה" ${athletes[index].rank === "כחולה" ? "selected": ""}>כחולה</option>
                    <option value="חומה" ${athletes[index].rank === "חומה" ? "selected": ""}>חומה</option>
                    <option value="שחורה" ${athletes[index].rank === "שחורה" ? "selected": ""}>שחורה</option>
                </select>
                <label for="branch-edit">סניף *</label><input type="text" id="branch-edit" value="${athletes[index].branch || ""}" required>
                <label for="coach-name-edit">שם מאמן *</label><input type="text" id="coach-name-edit" value="${athletes[index].coachName || ""}" required>
                <label for="weight-edit">משקל (ק"ג)</label><input type="number" step="0.01" id="weight-edit" value="${athletes[index].weight || 0}">
                <label for="payment-edit">תשלום</label><input type="text" id="payment-edit" value="${athletes[index].payment || ""}">
                <label for="comments-edit">הערות</label><textarea id="comments-edit">${athletes[index].comments}</textarea>     
                <button id="edit-athlete-save-btn">Save</button>
                <button id="edit-athlete-cancel-btn">Cancel</button>
            </form>
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
            leagueName: "No League",
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
            <form id="update-form" class="update-form">
                <h1>Edit Athlete Weight</h1>
                <input type="number" step="0.01" id="edit-weight-input" value="${weight}">
                <button id="save-btn">Save</button>
                <button id="cancel-btn">Cancel</button>
            </form>
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
            const groupKey = "NO MATCHING CATEGORY";
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
                    <div class="league-name-input" id="league-name-input-${e.id}" style="display:none;">
                        |<->|
                        <input type="text" id="league-name-${e.id}" data-league-id="${e.id}" />
                        <label for="league-name-${e.id}">שיוך לליגה</label>
                    </div>
                    <button class="edit-weight-btn" data-index="${athletesList.indexOf(e)}">Edit Weight</button>
                </li>`
            )
            .join("")}
        </ul>
        `;
        groupEl.classList.add("group");
        weighInContent.appendChild(groupEl);
    });

    // Show input field when checkbox is selected
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const athleteId = event.target.getAttribute('data-athlete-id');
            const inputField = document.getElementById(`league-name-input-${athleteId}`);
            if (event.target.checked) {
                inputField.style.display = 'inline';
            } else {
                inputField.style.display = 'none';
            }
        });
    });

};

const renderLeagues = () => {
    document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
        const athleteId = checkbox.getAttribute('data-athlete-id');
        const athleteIndex = athletes.findIndex((athlete) => athlete.id === athleteId)
        athletes[athleteIndex].leagueName = document.getElementById(`league-name-${athleteId}`).value.trim() || "No League";
    });

    const groupedData = {};

    athletes.forEach((entry) => {
        const groupKey = entry.leagueName;
        if (!groupedData[groupKey]) groupedData[groupKey] = [];
        groupedData[groupKey].push(entry);
    });

    const leaguesContent = document.getElementById("leagues-view");
    leaguesContent.innerHTML = "";

    Object.keys(groupedData).forEach((group) => {
        const groupEl = document.createElement("div");
        groupEl.innerHTML = `
            <div class="league-group-header" style="background-color: #f0f0f0; padding: 10px; font-weight: bold;">
                <strong>${group} | Count (${groupedData[group].length})</strong>
            </div>
            <ul>
                ${groupedData[group]
            .map(
                e => `<li>
                    <input type="checkbox" data-athlete-id="${e.id}" />
                    ${e.firstName} ${e.lastName} (${e.age}, ${e.weight}, ${e.rank})
                </li>`
            )
            .join("")}
            </ul>
        `;
        groupEl.classList.add("league-group");
        leaguesContent.appendChild(groupEl);
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
    const refreshWeighIn = document.getElementById("weigh-in-refresh-button");
    const searchWeighIn = document.getElementById("weigh-in-search");
    const refreshRegistration = document.getElementById("registration-refresh-button");
    const searchRegistration = document.getElementById("registration-search");
    const editWeightWeighIn = document.getElementById("grouped-view");
    const createLeagues = document.getElementById('create-leagues-btn');


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
            id: generateUUID(),
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
            leagueName: "No League",
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

    createLeagues.addEventListener('click', () => {
        renderLeagues();
    });
});

