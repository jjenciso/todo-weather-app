const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("new-task-input");
const addTaskButton = document.getElementById("add-task");
const completedTaskList = document.getElementById("completedTaskList");

let tasks = [];
let completedTasks = [];
let removedTasks = [];

const addTask = () => {
  const newTask = newTaskInput.value.trim();
  if (newTask !== "") {
    tasks.push(newTask);
    renderTaskList();
    newTaskInput.value = "";
  }
};

const removeTask = (i) => {
  const removed = tasks.splice(i, 1)[0];
  removedTasks.push(removed);
  renderTaskList();
};

const markCompletedTask = (i) => {
  const completed = tasks.splice(i, 1)[0];
  completedTasks.push(completed);
  renderTaskList();
  renderCompletedTask();
};

const renderTaskList = () => {
  taskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task;
    const x = document.createElement("i");
    x.classList.add("fa-solid", "fa-trash-can");
    x.addEventListener("click", () => {
      removeTask(i);
    });
    const check = document.createElement("i");
    check.classList.add("fa-solid", "fa-circle-check");
    check.addEventListener("click", () => {
      markCompletedTask(i);
    });
    li.appendChild(check);
    li.appendChild(x);
    taskList.appendChild(li);
  });
};

const renderCompletedTask = () => {
  completedTaskList.innerHTML = "";
  completedTasks.forEach((completedTask) => {
    const li = document.createElement("li");
    li.textContent = completedTask;
    completedTaskList.appendChild(li);
  });
};

addTaskButton.addEventListener("click", addTask);
newTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
