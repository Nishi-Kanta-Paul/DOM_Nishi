document.addEventListener("DOMContentLoaded", loadTasks);

function addTask(event) {
    event.preventDefault();

    const taskInput = document.getElementById("taskInput");
    const taskInputValue = taskInput.value.trim();

    if (taskInputValue === "") {
        alert("Please enter a task");
        return;
    }

    const taskListUl = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${taskInputValue}</span>
        <button onclick="editTask(this)" class="edit-btn">Edit</button>
        <button onclick="removeTask(this)" class="delete-btn">Delete</button>
    `;
    taskListUl.appendChild(li);
    taskInput.value = "";
    saveTasks();
}

function editTask(button) {
    const taskText = button.previousElementSibling;
    const originalText = taskText.textContent;
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.value = originalText;
    taskText.replaceWith(taskInput);

    button.textContent = "Save";
    button.setAttribute("onclick", "saveEdit(this, '" + originalText + "')");
}

function saveEdit(button, originalText) {
    const taskInput = button.previousElementSibling;
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = taskInput.value.trim();
    taskInput.replaceWith(taskText);

    button.textContent = "Edit";
    button.setAttribute("onclick", "editTask(this)");

    saveTasks();
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function clearChecked() {
    const taskListUl = document.getElementById("taskList");
    const tasks = taskListUl.querySelectorAll(".task-checkbox");
    let anyChecked = false;

    tasks.forEach(task => {
        if (task.checked) {
            anyChecked = true;
            task.parentElement.remove();
        }
    });

    if (!anyChecked) {
        alert("No tasks are checked!");
    }
    saveTasks();
}

function saveTasks() {
    const taskListUl = document.getElementById("taskList");
    const tasks = [];

    taskListUl.querySelectorAll("li").forEach(li => {
        const taskText = li.querySelector(".task-text").textContent;
        const isChecked = li.querySelector(".task-checkbox").checked;
        tasks.push({ text: taskText, checked: isChecked });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskListUl = document.getElementById("taskList");

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.checked ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button onclick="editTask(this)" class="edit-btn">Edit</button>
            <button onclick="removeTask(this)" class="delete-btn">Delete</button>
        `;
        taskListUl.appendChild(li);
    });
}
