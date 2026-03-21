// Task Array (state)
let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  let saved = localStorage.getItem("tasks");
  if (saved !== null) {
    tasks = JSON.parse(saved);
  }
}

// Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
  let html = "";

  for (let i = 0; i < tasks.length; i++) {
    html += "<li>" + tasks[i] +
      " <button onclick='removeTask(" + i + ")'>x</button></li>";
  }

  document.getElementById("list").innerHTML = html;
}

// Add task
function addTask() {
  let input = document.getElementById("task");
  let text = input.value.trim();

  if (text === "") return;

  tasks.push(text);
  input.value = "";

  saveTasks();
  displayTasks();
}

// Remove task
function removeTask(index) {
  tasks.splice(index, 1);

  saveTasks();
  displayTasks();
}

// Clear all tasks
function clearAll() {
  tasks = [];

  saveTasks();
  displayTasks();
}

// Initial load
loadTasks();
displayTasks();