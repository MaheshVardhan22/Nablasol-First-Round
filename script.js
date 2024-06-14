document.addEventListener("DOMContentLoaded", function() {
    loadProjectData();
    showStep(1);
});

function showStep(step) {
    const steps = document.querySelectorAll(".step");
    steps.forEach(function(s) {
        s.classList.remove("active");
    });
    document.getElementById(`step${step}`).classList.add("active");
}

function nextStep(step) {
    saveProjectData();
    showStep(step);
}

function prevStep(step) {
    showStep(step);
}

function selectType(type) {
    document.getElementById("hourlyRateContainer").style.display = type === 'time' ? 'block' : 'none';
    document.getElementById("budgetContainer").style.display = type === 'fixed' ? 'block' : 'none';
    localStorage.setItem('projectType', type);
}

function selectView(view) {
    localStorage.setItem('projectView', view);
}

function selectPermission(permission) {
    localStorage.setItem('projectPermission', permission);
}

function addTask() {
    const taskInput = document.getElementById("task");
    const taskList = document.getElementById("taskList");
    const task = taskInput.value.trim();
    if (task) {
        const li = document.createElement("li");
        li.textContent = task;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            taskList.removeChild(li);
            saveProjectData();
        };
        li.appendChild(removeButton);
        taskList.appendChild(li);
        taskInput.value = "";
        saveProjectData();
    }
}

function addTeamMember() {
    const teamInput = document.getElementById("team");
    const teamList = document.getElementById("teamList");
    const teamMember = teamInput.value.trim();
    if (teamMember) {
        const li = document.createElement("li");
        li.textContent = teamMember;
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function() {
            teamList.removeChild(li);
            saveProjectData();
        };
        li.appendChild(removeButton);
        teamList.appendChild(li);
        teamInput.value = "";
        saveProjectData();
    }
}

function saveProjectData() {
    const projectData = {
        projectName: document.getElementById("projectName").value,
        client: document.getElementById("client").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        notes: document.getElementById("notes").value,
        hourlyRate: document.getElementById("hourlyRate").value,
        budget: document.getElementById("budget").value,
        resetBudget: document.getElementById("resetBudget").checked,
        alertBudget: document.getElementById("alertBudget").checked,
        alertPercentage: document.getElementById("alertPercentage").value,
        tasks: Array.from(document.getElementById("taskList").children).map(li => li.firstChild.textContent),
        team: Array.from(document.getElementById("teamList").children).map(li => li.firstChild.textContent)
    };
    localStorage.setItem('projectData', JSON.stringify(projectData));
}

function loadProjectData() {
    const projectData = JSON.parse(localStorage.getItem('projectData'));
    if (projectData) {
        document.getElementById("projectName").value = projectData.projectName || '';
        document.getElementById("client").value = projectData.client || '';
        document.getElementById("startDate").value = projectData.startDate || '';
        document.getElementById("endDate").value = projectData.endDate || '';
        document.getElementById("notes").value = projectData.notes || '';
        document.getElementById("hourlyRate").value = projectData.hourlyRate || '';
        document.getElementById("budget").value = projectData.budget || '';
        document.getElementById("resetBudget").checked = projectData.resetBudget || false;
        document.getElementById("alertBudget").checked = projectData.alertBudget || false;
        document.getElementById("alertPercentage").value = projectData.alertPercentage || 80;

        const taskList = document.getElementById("taskList");
        projectData.tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = task;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = function() {
                taskList.removeChild(li);
                saveProjectData();
            };
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });

        const teamList = document.getElementById("teamList");
        projectData.team.forEach(member => {
            const li = document.createElement("li");
            li.textContent = member;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.onclick = function() {
                teamList.removeChild(li);
                saveProjectData();
            };
            li.appendChild(removeButton);
            teamList.appendChild(li);
        });

        if (projectData.projectType) {
            selectType(projectData.projectType);
        }
        if (projectData.projectView) {
            selectView(projectData.projectView);
        }
        if (projectData.projectPermission) {
            selectPermission(projectData.projectPermission);
        }
    }
}

function createProject() {
    saveProjectData();
    alert("Project created and data saved to localStorage!");
    // Additional logic for creating the project can be added here
}
