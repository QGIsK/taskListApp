//Define UI Var
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventListener();

//Load all event listeners
function loadEventListener(){
    //dom load event
    document.addEventListener("DOMContentLoaded", getTasks);
    //Add task event
    form.addEventListener("submit", addTask);
    //remove task event
    taskList.addEventListener("click", removeTask);
    //clear all 
    clearBtn.addEventListener("click", clearTasks);
    //filter tasks
    filter.addEventListener("keyup", filterTasks);
}

//get tasks from LS 
function getTasks() {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        //Create li element
        const li = document.createElement("li");
        //add class
        li.className = "collection-item";
        //Create test node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement("a");
        // add class
        link.className = "delete-item secondary-content"
        //add icon
        link.innerHTML = "<i class=\"fa fa-remove\"></i>";
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    })

}

function addTask(e) {
    if(taskInput.value === "") {
        alert("Add a task");
    }

    //Create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //Create test node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement("a");
    // add class
    link.className = "delete-item secondary-content"
    //add icon
    link.innerHTML = "<i class=\"fa fa-remove\"></i>";
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    //Store in localStorage
    storeTaskInLS(taskInput.value);

    //clear taskInput
    taskInput.value = "";

    e.preventDefault();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains("delete-item")) {
        if(confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            //remove from localStorage
            removeTaskFromLS(e.target.parentElement.parentElement);
        }
    }
}

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //clear from LS
    clearTasksFromLS();
}

function clearTasksFromLS() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

function storeTaskInLS(task) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLS(taskItem) {
    let tasks;
    if(localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent ===  task) {
            tasks.splice(index, 1);
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
}