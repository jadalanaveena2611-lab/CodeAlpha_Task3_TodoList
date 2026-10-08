const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function displayTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.className = "task-item";

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function () {

            task.completed = checkbox.checked;

            saveTasks();

            displayTasks();
        });


        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }


        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "edit-btn";

        editButton.addEventListener("click", function () {

            const newText = prompt("Edit your task:", task.text);

            if (newText !== null && newText.trim() !== "") {

                task.text = newText.trim();

                saveTasks();

                displayTasks();
            }
        });


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {

            tasks = tasks.filter(item => item.id !== task.id);

            saveTasks();

            displayTasks();
        });


        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(editButton);

        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false
    };


    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}


addTaskBtn.addEventListener("click", addTask);


taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();
    }
});


filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        displayTasks();
    });
});


displayTasks();