const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const totalEl = document.getElementById("total");
const completedEl = document.getElementById("completed");
const pendingEl = document.getElementById("pending");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load on start
displayTasks();
updateCounter();

taskForm.addEventListener("submit", e => {
    e.preventDefault();

    if (taskInput.value.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    tasks.push({ text: taskInput.value, completed: false });
    saveAndUpdate();
    taskInput.value = "";
});

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <div class="actions">
                <i class="fa-solid fa-pen" onclick="editTask(${index})"></i>
                <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndUpdate();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndUpdate();
}

function editTask(index) {
    const updated = prompt("Edit task:", tasks[index].text);
    if (updated && updated.trim() !== "") {
        tasks[index].text = updated;
        saveAndUpdate();
    }
}

function updateCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    totalEl.textContent = total;
    completedEl.textContent = completed;
    pendingEl.textContent = pending;
}

function saveAndUpdate() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    updateCounter();
}
