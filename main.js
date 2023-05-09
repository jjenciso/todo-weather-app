const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("new-task-input");
const addTaskButton = document.getElementById("add-task");
const completedTaskList = document.getElementById("completedTaskList");
const form = document.querySelector("form");
const weatherDiv = document.getElementById("weather");
const apiKey = "210fd50924e4430c5d3e11ff70c5bdb2";

let tasks = [];
let completedTasks = [];
let removedTasks = [];
// let currentTask = []

const addTask = () => {
  const newTask = newTaskInput.value.trim();
  if (newTask !== "") {
    tasks.push(newTask);
    localStorage.setItem("current", JSON.stringify(tasks))
    renderTaskList();
    newTaskInput.value = "";
  }
};

// const currentTaskList = () => {
//   const current = tasks;
//   currentTask.push(current)
//   localStorage.setItem("current", JSON.stringify(currentTask))
//   renderTaskList()
// }

const removeTask = (i) => {
  const removed = tasks.splice(i, 1)[0];
  removedTasks.push(removed);
  renderTaskList();
};

const markCompletedTask = (i) => {
  const completed = tasks.splice(i, 1)[0];
  completedTasks.push(completed);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
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

window.addEventListener("load", () => {
  let storedTasks = localStorage.getItem("current");
  const storedCompletedTasks = localStorage.getItem("completedTasks")
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
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
      renderTaskList()
    });
  }
  if (storedCompletedTasks) {
    completedTasks = JSON.parse(storedCompletedTasks);
    completedTasks.forEach((completedTask) => {
      const li = document.createElement("li");
      li.textContent = completedTask;
      completedTaskList.appendChild(li);
      renderTaskList()
      renderCompletedTask()
    });
  }
});

// Weather App

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = document.getElementById("city").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const temperature = data.main.temp - 270.15;
      const description = data.weather[0].description;
      const city = data.name;
      const country = data.sys.country;
      console.log(data);

      weatherDiv.innerHTML = `
      <h2>Weather for ${city}, ${country}</h2>
      <p>${description}</p>
      <p>Temperature: ${temperature.toFixed(2)} &deg;C</p>
      `;
    });

  try {
  } catch (error) {}
  (error) => {
    weatherDiv.innerHTML = `<p>${error.message}</p>`;
  };
});
