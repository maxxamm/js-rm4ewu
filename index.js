import './style.css';

const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', addTask);
loadTasksFromLocalStorage();

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);

    saveTaskToLocalStorage(taskText);

    taskInput.value = '';
    taskInput.focus();
  }
}

// EXTRA Aufgabe --> LocalStorage

function createTaskItem(taskText) {
  const taskItem = document.createElement('li');
  taskItem.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Löschen';
  taskItem.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    removeTaskFromLocalStorage(taskText);
  });

  return taskItem;
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log(tasks);
  tasks.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
  });
}

function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const updatedTasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
