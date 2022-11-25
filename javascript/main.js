// DOM ELEMENTS

const user = document.getElementById("username");
const confirmButton = document.getElementById("confirm-button");
const welcomeMsg = document.getElementById("welcome-message");
const mainContainer = document.getElementById("main-container");
const taskList = document.getElementById("task-list");
const wlecomeMessage = document.getElementById("welcome-message");
const usernameTooltip = document.getElementById("username-tooltip");
const sortButton1 = document.getElementById("sort-button1");
const sortButton2 = document.getElementById("sort-button2");
const mainTitle = document.getElementById("main-title");

let userName;
let edit = false;
let taskId;
let currentDate;
let currentTime;
let taskPrefix = "task";
const taskStorage = {};

// STATS SUMMARY ELEMENTS

const statTotal = document.getElementById("stat-total");
const statDeleted = document.getElementById("stat-deleted");
const statCompleted = document.getElementById("stat-completed");
let totalTasks = 0;
let totalCompleted = 0;
let totalLate = 0;

// MODAL ELEMENTS

const cancelButton = document.querySelector(".cancel-button");
const addListButton = document.getElementById("add-button");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".create-button");
const taskEntry = document.getElementById("task-entry");
const dateEntry = document.getElementById("date-entry");
const timeEntry = document.getElementById("time-entry");

user.addEventListener("input", function () {
  welcomeMsg.innerText = `Hello! ${user.value}`;
  if (!user.value) {
    welcomeMsg.innerHTML = "Welcome,enter your name!";
  }
});

confirmButton.addEventListener("click", function () {
  userName = user.value;
  const welcomeContainer = document.getElementById("container-welcome");
  if (!userName) {
    setTimeout(function () {
      welcomeMsg.classList.add("up-translate");
      usernameTooltip.style.display = "block";
      usernameTooltip.classList.add("tooltip-animation");
      setTimeout(function () {
        welcomeMsg.classList.remove("up-translate");
        welcomeMsg.classList.add("down-translate");
        usernameTooltip.style.display = "none";
        usernameTooltip.classList.remove("tooltip-animation");
      }, 5000);
      welcomeMsg.classList.remove("down-translate");
    });
  } else {
    mainTitle.innerText = `Hi ${userName}, What do you have planned?`;
    welcomeContainer.style.display = "none";
    mainContainer.style.display = "block";
  }
});

// ********** Modal Open *********

addListButton.addEventListener("click", function () {
  mainContainer.style.display = "none";
  timeEntry.disabled = true;
});

dateEntry.addEventListener("input", function () {
  if (dateEntry.value === "") {
    timeEntry.disabled = true;
    timeEntry.value = "";
  } else {
    timeEntry.disabled = false;
  }
});

// ********** Modal close *********

taskEntry.addEventListener("input", function () {
  if (taskEntry.value === "") {
    modalClose.disabled = true;
  } else {
    modalClose.disabled = false;
  }
});

modalClose.addEventListener("click", function () {
  if (!edit) {
    addTask();
    totalTasks += 1;

    // write function

    taskStorage[taskPrefix + totalTasks] = [
      taskEntry.value,
      dateEntry.value,
      timeEntry.value,
    ];

    taskList.lastElementChild.id = taskPrefix + totalTasks;

    setTimeout(function () {
      taskList.lastChild.scrollIntoView({ behavior: "smooth" });
      statTotal.innerText = totalTasks;
    });

    setTimeout(function () {
      taskList.lastChild.firstElementChild.nextSibling.classList.add(
        "entry-animation"
      );
    }, 200);

    setTimeout(function () {
      if (totalTasks !== 0) {
        taskList.lastChild.firstElementChild.nextSibling.classList.remove(
          "entry-animation"
        );
      }
    }, 2001);
  } else {
    // write function

    const editedTask =
      document.getElementById(taskId).firstElementChild.nextSibling;

    taskStorage[taskId][0] = taskEntry.value;
    taskStorage[taskId][1] = dateEntry.value;
    taskStorage[taskId][2] = timeEntry.value;

    editedTask.value = taskStorage[taskId][0];

    setTimeout(function () {
      editedTask.scrollIntoView({ behavior: "smooth" });
    });

    setTimeout(function () {
      editedTask.classList.add("entry-animation");
    }, 200);

    setTimeout(function () {
      editedTask.classList.remove("entry-animation");
    }, 2001);

    edit = false;
  }

  mainContainer.style.display = "block";
  resetValues(taskEntry, dateEntry, timeEntry);
  modalClose.disabled = "true";
});

cancelButton.addEventListener("click", function () {
  mainContainer.style.display = "block";
  resetValues(taskEntry, dateEntry, timeEntry);
});

// ********** Add task to main screen

function addTask() {
  const newItem = document.createElement("li");
  const newTask = document.createElement("input");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const newRadio = document.createElement("input");
  const lateItem = document.createElement("span");

  newRadio.type = "checkbox";
  newRadio.classList.add("task-completed");
  newRadio.id = "radio";
  newTask.type = "text";
  newTask.classList.add("form-control");
  newTask.value = taskEntry.value;
  taskList.appendChild(newItem);
  newItem.append(newRadio);
  newItem.append(newTask);

  newTask.after(lateItem);
  lateItem.classList.add("late-item");
  lateItem.innerHTML = "DUE";
  lateItem.classList.add("late-item");

  deleteButton.innerHTML = `<img id = "delete-button" class = "action-icon"src="/images/delete-icon.png">`;
  deleteButton.classList.add("action-button");
  newItem.append(deleteButton);
  editButton.innerHTML = `<img id = "edit-button" class = "action-icon"src="/images/edit-icon.png" data-bs-toggle="modal" data-bs-target="#staticBackdrop">`;
  editButton.classList.add("action-button");
  deleteButton.after(editButton);
  newTask.readOnly = "true";
}

taskList.addEventListener("click", function (e) {
  const key = e.target.parentElement.parentElement.id;
  if (e.target.id === "delete-button") {
    e.target.parentElement.parentElement.remove();
    totalTasks -= 1;
    // write function
    delete taskStorage[key];
    statTotal.innerText = totalTasks;
  } else if (e.target.id === "edit-button") {
    mainContainer.style.display = "none";
    taskEntry.value = taskStorage[key][0];
    dateEntry.value = taskStorage[key][1];
    timeEntry.value = taskStorage[key][2];
    taskId = key;
    edit = true;
    modalClose.disabled = false;
  }
});

// ********Mark task as completed *******

taskList.addEventListener("click", function (e) {
  if (e.target.id === "radio") {
    if (e.target.checked === true) {
      e.target.nextElementSibling.classList.add("completed-task");
      totalCompleted += 1;
      statCompleted.innerText = totalCompleted;
      taskStorage[e.target.parentElement.id][3] = "true";
    } else {
      e.target.nextElementSibling.classList.remove("completed-task");
      totalCompleted -= 1;
      statCompleted.innerText = totalCompleted;
      taskStorage[e.target.parentElement.id][3] = "false";
    }
  }
});

// ******** Sort Tasks *******

sortButton1.addEventListener("click", function () {
  sortTasks();
});

sortButton2.addEventListener("click", function () {
  sortTasks();
});

// ********Function Reset Values To Default *******

function resetValues(value1, value2, value3) {
  for (val in arguments) {
    arguments[val].value = "";
  }
}

// ******** Date Functions Default *******

function sum(total, num) {
  return parseInt(total) + parseInt(num);
}

function getDateCurrent() {
  const currentDate1 = new Date();
  const currentYear = currentDate1.getFullYear();
  const currentMonth = currentDate1.getMonth();
  const currentDay = currentDate1.getDate();
  return currentYear + currentMonth + currentDay + 1;
}

function getTimeCurrent() {
  const currentDate2 = new Date();
  const currentHour = currentDate2.getHours();
  const currentMin = currentDate2.getMinutes();
  return currentHour + currentMin;
}

function checkDate(dateValue, timeValue) {
  for (const date in taskStorage) {
    let dateFormat = taskStorage[date][1].split("-");
    let timeFormat = taskStorage[date][2].split(":");

    let dateCalc = dateFormat.reduce(sum);
    let timeCalc = timeFormat.reduce(sum);

    const overdueItem =
      document.getElementById(date).firstElementChild.nextSibling.nextSibling;

    if (dateCalc === "") {
      b = "unassigned";
      overdueItem.style.display = "none";
    } else if (dateCalc < dateValue) {
      overdueItem.style.display = "block";
    } else if (dateCalc <= dateValue && timeCalc <= timeValue) {
      overdueItem.style.display = "block";
    } else {
      overdueItem.style.display = "none";
    }
  }
}

setInterval(function () {
  currentDate = getDateCurrent();
  currentTime = getTimeCurrent();
  checkDate(currentDate, currentTime);
}, 3000);

// *********** Check Overdue Task **********

// *********** Function Sort All Tasks **********

function sortTasks() {
  const unsortedItems = Object.values(taskStorage);
  const sortedItems = unsortedItems.sort();
  const keyValues = Object.keys(taskStorage);

  for (let i in keyValues) {
    const getTask = document.getElementById(keyValues[i]);

    taskStorage[keyValues[i]] = sortedItems[i];
    getTask.firstElementChild.nextSibling.value = taskStorage[keyValues[i]][0];
    getTask.firstElementChild.checked = taskStorage[keyValues[i]][3];

    if (getTask.firstElementChild.checked === true) {
      getTask.firstElementChild.nextSibling.classList.add("completed-task");
    } else {
      getTask.firstElementChild.nextSibling.classList.remove("completed-task");
    }
  }
}

// *********** Maybe Implement **********

// const tt = document.getElementById("tt");

// tt.addEventListener("change", function () {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => {
//     const uploadedImage = reader.result;
//     document.querySelector("body").style.background = `url(${uploadedImage})`;
//   });
//   reader.readAsDataURL(this.files[0]);
// });

// ***********Maybe background - random **********

// const arr = ["background1.jpg", "background2.jpg"];

// const test = document.querySelector("body");

// test.style.background = "url(background1.jpg)";
