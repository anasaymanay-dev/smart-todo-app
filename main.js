let addBtn = document.getElementById("add-btn");
let taskInput = document.getElementById("task-input");
let ul = document.getElementById("task-list");
let clearAll = document.getElementById("clear-all");
let taskCount = document.getElementById("task-count");
let data = [];

addBtn.addEventListener("click", addTask);

taskInput.onkeydown = function (e) {
    if (e.key === "Enter") {
        addTask();
    }
};

function addTask() {
    let value = taskInput.value.trim();
    if (value === "") {
        return;
    }
    data.push({
        taskName: value,
        completed: false,
    });
    showElements();
    taskInput.focus();
}

clearAll.onclick = function () {
    data = [];
    showElements();
};

function deleteTask(i) {
    data.splice(i, 1);
    showElements();
}

function completeTask(i) {
    data[i].completed = !data[i].completed;
    showElements();
}

function showElements() {
    ul.textContent = "";

    data.forEach(function (el, index) {
        let li = document.createElement("li");

        if (el.completed) {
        li.classList.add("completed");
        }

        li.innerHTML = `
                <span>${el.taskName}</span>
                <div>
                    <button class="delete-btn btn btn-danger">Delete</button>
                    <button class="complete-btn btn btn-success">${
                        el.completed ? "Undo" : "Complete"
                    }</button> 
                    
                </div>
            `;
        li.querySelector(".delete-btn").addEventListener("click", function () {
        deleteTask(index);
        });

        li.querySelector(".complete-btn").addEventListener("click", function () {
        completeTask(index);
        });

        ul.appendChild(li);
    });
    taskInput.value = "";

    taskCount.innerHTML = `Tasks: ${data.length}`;
}
