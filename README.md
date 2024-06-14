 Nablasol-First-Round


 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Management</title>
    <style>
      body {
    font-family: sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(180deg, #8400ff, #e509f9)
}
.container {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding: 20px;
    width: 90%;
    max-width: 500px;
}
.step {
    display: none;
}
.step.active {
    display: block;
}
h2 {
    margin-top: 0;
    text-align: center;
}
label {
    display: block;
    margin-bottom: 5px;
}
.dates{
    display: flex;
    gap: 10px;
}
input[type="text"],
input[type="number"],
textarea {
    width: 95%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}
input[type="date"]{
    width: 21.5%;
    padding: 2px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}
select {
    width: 50%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}
button {
    background-color:  #0056b3;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer; 
}
button:hover {
    background: linear-gradient(180deg, #00f7ff, #0056b3);
    transition: all 1s;
}
.type-selection,
.view-selection,
.permission-selection {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
}
.type-btn{
    display: flex;
    width: 30%;
    font-weight: bold;
    background-color: #205dd7;
}
.type-btn:hover{
    background: linear-gradient(180deg, #e509f9, #8400ff);
}
.view-btn,
.permission-btn {
    flex: 1;
    margin-right: 5px;
    margin-bottom: 5px;
    min-width: 45%;
}
.type-btn:last-child,
.view-btn:last-child,
.permission-btn:last-child {
    margin-right: 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
ul li {
    padding: 5px;
    background-color: #f4f4f4;
    margin-bottom: 5px;
    border-radius: 3px;
}
ul li button {
    float: right;
    background-color: #dc3545;
    border: none;
    padding: 2px 5px;
    cursor: pointer;
}
ul li button:hover {
    background-color: #c82333;
}
    </style>
</head>
<body>
    <div class="container">
        <div class="step" id="step1">
            <h2>Create a project</h2>
            <form id="projectForm">
                <label for="projectName">Project Name:</label>
                <input type="text" id="projectName" name="projectName" required>
                <label for="client">Client:</label>
                <select id="client" name="client">
                    <option value="">Select a client</option>
                    <option value="new">TATA</option>
                    <option value="new">JIO</option>
                    <option value="new">APPLE</option>
                    <option value="new">SAMSUNG</option>
                    <option value="new">HCL</option>
                </select>
                <label for="startDate">Date:</label>
                <div class="dates">
                    <input type="date" id="startDate" name="startDate" required><span>-</span>
                    <input type="date" id="endDate" name="endDate" required>
                </div>
                <label for="notes">Notes:</label>
                <textarea id="notes" name="notes"></textarea>            
                <button type="button" onclick="nextStep(2)">Next</button>
            </form>
        </div>   
        <div class="step" id="step2">
            <h2>Project Type</h2>
            <div class="type-selection">
                <button type="button" class="type-btn" onclick="selectType('time')">Time & Materials</button>
                <button type="button" class="type-btn" onclick="selectType('fixed')">Fixed Fee</button>
                <button type="button" class="type-btn" onclick="selectType('nonbillable')">Non-Billable</button>
            </div>
            <div id="hourlyRateContainer">
                <label for="hourlyRate">Project Hourly Rate:</label>
                <input type="number" id="hourlyRate" name="hourlyRate" step="0.01">
            </div>
            <div id="budgetContainer">
                <label for="budget">Budget:</label>
                <input type="number" id="budget" name="budget" step="0.01">
                <label>
                    <input type="checkbox" id="resetBudget" name="resetBudget">
                    Budget resets every month
                </label>             
                <label>
                    <input type="checkbox" id="alertBudget" name="alertBudget">
                    Send email alerts if project exceeds <input type="number" id="alertPercentage" name="alertPercentage" value="80" step="0.01">% of budget
                </label>
            </div>
            <button type="button" onclick="prevStep(1)">Back</button>
            <button type="button" onclick="nextStep(3)">Next</button>
        </div>        
        <div class="step" id="step3">
            <h2>Select a View</h2>
            <div class="view-selection">
                <button type="button" class="view-btn" onclick="selectView('list')">List</button>
                <button type="button" class="view-btn" onclick="selectView('board')">Board</button>
            </div>
            <button type="button" onclick="prevStep(2)">Back</button>
            <button type="button" onclick="nextStep(4)">Next</button>
        </div>
        <div class="step" id="step4">
            <h2>Who Can Manage Projects</h2>
            <div class="permission-selection">
                <button type="button" class="permission-btn" onclick="selectPermission('everyone')">Everyone</button>
                <button type="button" class="permission-btn" onclick="selectPermission('admins')">Only Admins</button>
                <button type="button" class="permission-btn" onclick="selectPermission('specific')">Only Specific People</button>
            </div>
            <button type="button" onclick="prevStep(3)">Back</button>
            <button type="button" onclick="nextStep(5)">Next</button>
        </div>        
        <div class="step" id="step5">
            <h2>Tasks</h2>
            <input type="text" id="task" placeholder="Add a task">
            <button type="button" onclick="addTask()">Add</button>
            <ul id="taskList"></ul>           
            <h2>Team</h2>
            <input type="text" id="team" placeholder="Invite or Add a person">
            <button type="button" onclick="addTeamMember()">Add</button>
            <ul id="teamList"></ul>            
            <button type="button" onclick="prevStep(4)">Back</button>
            <button type="button" onclick="createProject()">Create Project</button>
        </div>
    </div>   
    <script src="script.js"></script>
</body>
</html>
