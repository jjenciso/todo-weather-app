const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("new-task-input");
const addTaskButton = document.getElementById("add-task");
const completedTaskList = document.getElementById("completedTaskList");
const weatherDiv = document.getElementById("weather");
const apiKey = "210fd50924e4430c5d3e11ff70c5bdb2";
const background = document.getElementById("background");

const setVideoSize = () => {
  const vidWidth = 1920;
  const vidHeight = 1080;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const tempVidWidth = windowHeight * vidWidth/vidHeight;
  const tempVidHeight = windowWidth * vidHeight/vidWidth;
  const newVidWidth = tempVidWidth > windowWidth ? tempVidWidth : windowWidth;
  const newVidHeight = tempVidHeight > windowHeight ? tempVidHeight : windowHeight;

  background.style.width = newVidWidth + 'px';
  background.style.height = newVidHeight + 'px';
}


let tasks = [];

const addTask = (task) => {
  tasks.push({
    task: task,
    completed: false,
  });
  updateLocalStorage();
  renderTaskList();
};

const removeTask = (i) => {
  tasks.splice(i, 1);
  updateLocalStorage();
  renderTaskList();
};

const markCompletedTask = (i) => {
  tasks[i].completed = true;
  updateLocalStorage();
  renderTaskList();
};

const renderTaskList = () => {
  taskList.innerHTML = "";
  completedTaskList.innerHTML = "";
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    const taskText = document.createTextNode(task.task);
    li.appendChild(taskText);
    if (task.completed) {
      const trash = document.createElement("i");
      trash.classList.add("fa-solid", "fa-trash-can");
      trash.addEventListener("click", () => {
        removeTask(i);
      });
      completedTaskList.appendChild(li);
      li.appendChild(trash);
    } else {
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
    }
  });
};

const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

window.addEventListener("load", () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTaskList();
});

addTaskButton.addEventListener("click", () => {
  addTask(newTaskInput.value);
  newTaskInput.value = "";
});
newTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask(newTaskInput.value);
    newTaskInput.value = "";
  }
});

// Weather App

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Butuan&appid=${apiKey}`;

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

    weatherDiv.innerHTML = `
      <h2>Weather for ${city}, ${country}</h2>
      <p>${description.toUpperCase()}</p>
      <p>Temperature: ${temperature.toFixed(2)} &deg;C</p>
      `;
  });

try {
} catch (error) {}
(error) => {
  weatherDiv.innerHTML = `<p>${error.message}</p>`;
};

const timeDiv = document.getElementById("time");

const updateDateTime = () => {
  const now = new Date();
  const dateTime = {hour12: true, hour: "numeric", minute: "numeric", second: "numeric"};
  const formatted = now.toLocaleString("en-US", dateTime);
  timeDiv.textContent = formatted;
};
setInterval(updateDateTime, 1000)
