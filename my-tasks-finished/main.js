// My Tasks Basic
// HTML Elements
let taskInputEl = document.getElementById("task-input");
let menuEl = document.getElementById('menu');
let tasksEl = document.getElementById('tasks');

// Global Variables
let tasks = initTasks();
displayTasks();

// Go Btn - Menu Listener
taskInputEl.addEventListener('keydown', taskSubmitHandler);

function taskSubmitHandler(e) {
  console.log(e.code);
  if (e.code === "Enter") {
    // Add Submitted Task
    let userTask = taskInputEl.value;
    tasks.push(newTask(userTask));
    saveTasks();
    displayTasks();
    taskInputEl.value = "";
  }
}

// MENU FUNCTIONS
// toggle completed status of a task
function toggleTask() {
  let taskIndex = +prompt('Enter # of task:');
  let task = tasks[taskIndex];
  if (task.completed === '') {
    task.completed = 'completed';
  } else {
    task.completed = '';
  }
  saveTasks();
  displayTasks();
}

// remove a task by index
function removeTask() {
  let taskIndex = +prompt("Enter a # of task:");
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayTasks();

}

// clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  displayTasks();
}

// HELPER FUNCTIONS
// load tasks from local storage
function initTasks() {
  let jsonTasks = localStorage.getItem('tasks');
  return JSON.parse(jsonTasks) ?? [];
}

// display all tasks in a global tasks array
function displayTasks() {
  tasksEl.innerHTML = '';
  for (i = 0; i < tasks.length; i++) {
    tasksEl.appendChild(getTaskHTML(tasks[i], i));
  }
}

// return a new task object
function newTask(taskDescription) {
  return {
    description: taskDescription,
    completed: false,
  };
}

// save global tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// get html for given task
function getTaskHTML(task, index) {
  // Use JS to build the task <div>

  // Check Box Element
  let checkBoxEl = document.createElement("input");
  checkBoxEl.type = "checkbox";
  checkBoxEl.dataset.index = index;
  checkBoxEl.checked = task.completed;
  checkBoxEl.addEventListener("input", checkBoxHandler);


  // Task Description Text Node
  let textSpanEl = document.createElement("span");
  textSpanEl.innerHTMl = task.description;
  if (task.completed) {
    textSpanEl.className = "completed";
  }

  // Remove Button
  let buttonEl = document.createElement("button");
  buttonEl.innerHTML = "Remove";
  buttonEl.dataset.index = index;
  buttonEl.addEventListener("click", removeBtnHandler);

  // Add eveything to a div element
  let divEl = document.createElement("div");
  divEl.appendChild(checkBoxEl);
  divEl.appendChild(textSpanEl);
  divEl.appendChild(buttonEl);

  return divEl;
}

// Event Functions
function checkBoxHandler(e) {
  // Get index of task to toggle
  let taskIndex = +e.target.dataset.index;
  let task = tasks[taskIndex];
  task.completed = !task.completed;
  saveTasks();
  displayTasks();
}

function removeBtnHandler(e) {
  // Get index of task to remove
  let taskIndex = +e.target.dataset.index;
  tasks.splice(taskIndex, 1);
  saveTasks();
  displayTasks();
}