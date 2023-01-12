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
const backgroundControls = document.querySelectorAll(".background-controls");

let userName;
let edit = false;
let taskId;
let currentDate;
let currentTime;
let taskPrefix = "task";
let taskStorage;
let storageLocal ='';
let storageDeleted = '';
let storageCompleted ='';

// STATS SUMMARY ELEMENTS

const statTotal = document.getElementById("stat-total");
const statDeleted = document.getElementById("stat-deleted");
const statCompleted = document.getElementById("stat-completed");
let totalTasks;
let totalCompleted;
let totalLate;

// MODAL ELEMENTS

const cancelButton = document.querySelector(".cancel-button");
const addListButton = document.getElementById("add-button");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".create-button");
const taskEntry = document.getElementById("task-entry");
const dateEntry = document.getElementById("date-entry");
const timeEntry = document.getElementById("time-entry");
const modalError = document.getElementById("modal-error");
const modalTitle = document.getElementById("staticBackdropLabel");


user.addEventListener("input", function () {
  welcomeMsg.innerText = `Welcome! ${user.value}`;
  if (!user.value) {
    welcomeMsg.innerHTML = "Hello,enter your name!";
  }
});

confirmButton.addEventListener("click", function () {
  userName = user.value;
  const welcomeContainer = document.getElementById("container-welcome");
  const welcomeError = document.getElementById("username-tooltip");
  if (!userName) {
    welcomeError.innerText = `Please fill in your username!`;
    tooltipControl();
  } else if(userName.length > 9){
    console.log("error");
    welcomeError.innerText = `Plese use 9 characters or less!`;
    tooltipControl();
  } else {
    if(window.innerWidth <= 407){
      mainTitle.innerHTML = `Hi ${userName}!
      Create a Todo.`;
    } else if (window.innerWidth > 407){
      mainTitle.innerHTML = `Hi ${userName}! Create a Todo for today.`;
    }
    welcomeContainer.style.display = "none";
    mainContainer.style.display = "block";
  }
});


function tooltipControl (){
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
}

// ********** Modal Open *********

addListButton.addEventListener("click", function () {
  mainContainer.style.display = "none";
  timeEntry.disabled = true;
  dateEntry.disabled = true;
  timeEntry.style.color = "#5c9ead";
  dateEntry.style.color = "#5c9ead";
  modalTitle.innerText = "Add Todo";
});

dateEntry.addEventListener("input", function () {
  if (dateEntry.value === "") {
    dateEntry.style.color = "#5c9ead";
    timeEntry.disabled = true;
  } else if (dateEntry.value!== ""){
    timeEntry.disabled = false;
    dateEntry.style.color = "white";
  }
  checkDisabled(timeEntry);

});

taskEntry.addEventListener("focusin",function () {
  modalError.style.display = "block";
  modalError.innerText = "Fill in a Todo!";
  taskEntry.addEventListener("focusout",function () {
    modalError.style.display = "none";
  });
});

dateEntry.addEventListener("focusin",function () {
  modalError.style.display = "block";
  modalError.innerText = "Optional - Fill in a date!";
  dateEntry.addEventListener("focusout",function () {
    modalError.style.display = "none";
  });
});

timeEntry.addEventListener("focusin",function () {
  modalError.style.display = "block";
  modalError.innerText = "Optional - Fill in a time!";
  timeEntry.addEventListener("focusout",function () {
    modalError.style.display = "none";
  });
});


timeEntry.addEventListener("input",function () {
  if(timeEntry.value === ""){
    timeEntry.style.color = "#5c9ead";
  } else {
    timeEntry.style.color = "white";
  }
});


taskEntry.addEventListener("input", function () {
  if (taskEntry.value === "") {
    timeEntry.disabled = true;
    dateEntry.disabled = true;
    modalClose.disabled = true;
  } else {
    timeDisabled();
    modalClose.disabled = false;
    dateEntry.disabled = false;
  } 
  checkDisabled(dateEntry,timeEntry);

});



function timeDisabled (){
  if(dateEntry.value !== ""){
    timeEntry.disabled = false;

  }
}

function checkDisabled (date, time){
  for (val in arguments) {
    if(arguments[val].value !== "" && arguments[val].disabled === true){
      arguments[val].style.color = "#5c9ead";
    } else if (arguments[val].value !== ""){
      arguments[val].style.color = "white";
    } 
  }
}


function timeValidation (time,currentTime,entry){

  let timeGet;
  let timeCalc;

  if(entry === "date"){
    timeGet = time.value.split("-");
    timeCalc = timeGet.reduce(sum);
  } else {
    timeGet = time.value.split(":");
    timeCalc = timeGet.reduce(sum);
  }

  console.log(timeGet);
  console.log(timeCalc);

}

// ********** Modal close *********



modalClose.addEventListener("click", function () {
  if (!edit) {
    fixTime();
    addTask();
    totalTasks += 1;

    taskStorage[taskPrefix + totalTasks] = [
      taskEntry.value,
      dateEntry.value,
      timeEntry.value,
    ];

    storageLocal = JSON.stringify(taskStorage);
    localStorage.setItem("taskInfo",storageLocal);

    taskList.firstElementChild.id = taskPrefix + totalTasks;

    storageDeleted = JSON.stringify(totalTasks);
    localStorage.setItem("totalTasks",storageDeleted);

    setTimeout(function () {
      taskList.firstChild.scrollIntoView({ behavior: "smooth" });
      statTotal.innerText = totalTasks;
    },100);

    setTimeout(function () {
      if(window.innerWidth < 576){
        taskList.firstChild.firstElementChild.nextSibling.classList.add(
          "entry-animation2"
        );
      } else{
        taskList.firstChild.firstElementChild.nextSibling.classList.add(
          "entry-animation"
        );
      }
    
    }, 200);

    setTimeout(function () {
      if (totalTasks !== 0) {
        if(window.innerWidth < 576){
          taskList.firstChild.firstElementChild.nextSibling.classList.remove(
            "entry-animation2"
          );
        } else{
          taskList.firstChild.firstElementChild.nextSibling.classList.remove(
            "entry-animation"
          );
        }
      }
    }, 2001);
  } else {

    const editedTask =
      document.getElementById(taskId).firstElementChild.nextSibling;

    taskStorage[taskId][0] = taskEntry.value;
    taskStorage[taskId][1] = dateEntry.value;
    taskStorage[taskId][2] = timeEntry.value;

    storageLocal = JSON.stringify(taskStorage);
    localStorage.setItem("taskInfo",storageLocal);

    editedTask.value = taskStorage[taskId][0];

    setTimeout(function () {
      editedTask.scrollIntoView({ behavior: "smooth" });
    },200);

    setTimeout(function () {
      if(window.innerWidth <576){
        editedTask.classList.add("entry-animation2");
      } else{
        editedTask.classList.add("entry-animation")
      }
    }, 200);

    setTimeout(function () {
      if(window.innerWidth <576){
        editedTask.classList.remove("entry-animation2");
      } else{
        editedTask.classList.remove("entry-animation")
      }
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

function fixTime(){
  if(timeEntry.disabled === true){
    timeEntry.value = "";
  }

}

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
  taskList.insertBefore(newItem, taskList.firstChild);
  newItem.append(newRadio);
  newItem.append(newTask);

  newTask.after(lateItem);
  lateItem.classList.add("late-item");
  lateItem.innerHTML = "DUE";
  lateItem.classList.add("late-item");

  deleteButton.innerHTML = `<img id = "delete-button" class = "action-icon"src="/icons/delete-icon.png">`;
  deleteButton.classList.add("action-button");
  newItem.append(deleteButton);
  editButton.innerHTML = `<img id = "edit-button" class = "action-icon"src="/icons/edit-icon.png" data-bs-toggle="modal" data-bs-target="#staticBackdrop">`;
  editButton.classList.add("action-button");
  deleteButton.after(editButton);
  newTask.readOnly = "true";
}

taskList.addEventListener("click", function (e) {
  const key = e.target.parentElement.parentElement.id;
  if (e.target.id === "delete-button") {
    setTimeout(function () {
      e.target.parentElement.parentElement.remove();
    },100);
    totalTasks -= 1;
    // write function
    delete taskStorage[key];

    statTotal.innerText = totalTasks;

    storageDeleted = JSON.stringify(totalTasks);
    localStorage.setItem("totalTasks",storageDeleted);

    storageLocal = JSON.stringify(taskStorage);
    localStorage.setItem("taskInfo",storageLocal);

  } else if (e.target.id === "edit-button") {
    modalTitle.innerText = "Edit Todo";
    setTimeout(function () {
      mainContainer.style.display = "none";;
    },100);
    taskEntry.value = taskStorage[key][0];
    dateEntry.value = taskStorage[key][1];
    timeEntry.value = taskStorage[key][2];
    taskId = key;
    storageLocal = JSON.stringify(taskStorage);
    localStorage.setItem("taskInfo",storageLocal);
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

      taskStorage[e.target.parentElement.id][3] = true;

      storageLocal = JSON.stringify(taskStorage);
      localStorage.setItem("taskInfo",storageLocal);

      storageCompleted = JSON.stringify(totalCompleted);
      localStorage.setItem("totalCompleted",storageCompleted);

    } else {
      e.target.nextElementSibling.classList.remove("completed-task");
      totalCompleted -= 1;

      statCompleted.innerText = totalCompleted;
      taskStorage[e.target.parentElement.id][3] = false;

      storageLocal = JSON.stringify(taskStorage);
      localStorage.setItem("taskInfo",storageLocal);

      storageCompleted = JSON.stringify(totalCompleted);
      localStorage.setItem("totalCompleted",storageCompleted);
    }
  }
});

// ******** Sort Tasks *******

sortButton1.addEventListener("click", function () {
  sortTasks();
  storageLocal = JSON.stringify(taskStorage);  
  localStorage.setItem("taskInfo",storageLocal);
});

sortButton2.addEventListener("click", function () {
  sortTasks();
  storageLocal = JSON.stringify(taskStorage);
  localStorage.setItem("taskInfo",storageLocal);
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
      overdueItem.classList.remove("overdue");
    } else if (dateCalc < dateValue) {
      overdueItem.style.display = "block";
      overdueItem.classList.add("overdue");
    } else if (dateCalc <= dateValue && timeCalc <= timeValue) {
      overdueItem.style.display = "block";
      overdueItem.classList.add("overdue");
    } else {
      overdueItem.style.display = "none";
      overdueItem.classList.remove("overdue")
    }
  }
}

function setOverdue() {
  const allDue = document.querySelectorAll(".overdue");
  const statOverdue = document.getElementById("stat-overdue");
  let overdueTotal = allDue.length;
  statOverdue.innerText = overdueTotal;
};


setInterval(function () {
  currentDate = getDateCurrent();
  currentTime = getTimeCurrent();
  checkDate(currentDate, currentTime);
  setOverdue();
}, 100);

// *********** Check Overdue Task **********



// *********** Change Mobile Title **********

addEventListener("resize", function(){
  if(window.innerWidth <= 407){
    mainTitle.innerHTML = `Hi ${userName}!
    Create a Todo.`;
  } else if (window.innerWidth > 407){
    mainTitle.innerHTML = `Hi ${userName}! Create a Todo for today.`;
  }
});



// *********** Function Sort All Tasks **********

function sortTasks() {
  const unsortedItems = Object.values(taskStorage);
  console.log(taskStorage);
  console.log(unsortedItems)
  const sortedItems = unsortedItems.sort();
  console.log(sortedItems);
  const keyValues = Object.keys(taskStorage);
  console.log(keyValues);
  let numItems = Object.keys(taskStorage).length;
  console.log(numItems);

  for (let i in keyValues) {
    const getTask = document.getElementById(keyValues[i]);
    taskStorage[keyValues[i]] = sortedItems[numItems-1];
    getTask.firstElementChild.nextSibling.value = taskStorage[keyValues[i]][0];
    getTask.firstElementChild.checked = taskStorage[keyValues[i]][3];

    if (getTask.firstElementChild.checked === true) {
      getTask.firstElementChild.nextSibling.classList.add("completed-task");
    } else {
      getTask.firstElementChild.nextSibling.classList.remove("completed-task");
    }
    numItems-=1;
  }
};


// *********** Function Sort All Tasks **********

function reloadTasks(){
  let getData = localStorage.getItem("taskInfo");
  let data = JSON.parse(getData);

  let getCompleted = localStorage.getItem("totalCompleted");
  let dataCompleted = JSON.parse(getCompleted);

  if(data === null){
    totalTasks = 0;
    totalCompleted = 0;
    totalLate = 0;
    taskStorage = {};
  } else if (data !== null){
    const userInfo = localStorage.getItem("taskInfo");
    const userInfoObj = JSON.parse(userInfo);
    const dataValues = Object.keys(userInfoObj);
    const firstTask = document.getElementById("task-list");
    const totalGet = localStorage.getItem("totalTasks");
    const totalData = JSON.parse(totalGet);

    totalCompleted = dataCompleted;
    totalTasks = totalData;
    statTotal.innerHTML = totalTasks;
    statCompleted.innerText = dataCompleted;

    taskStorage ={};

    for(let k in dataValues){
      taskStorage[dataValues[k]] = userInfoObj[dataValues[k]];
    }

    for (let i in dataValues){
      addTask();
      firstTask.firstElementChild.id = dataValues[i];
      if(userInfoObj[dataValues[i]][3] === undefined){
        firstTask.firstElementChild.firstChild.checked = false;
      }else{
        firstTask.firstElementChild.firstChild.checked = userInfoObj[dataValues[i]][3];
      }
      firstTask.firstElementChild.firstChild.nextSibling.value = userInfoObj[dataValues[i]][0];
    }asdasdas
  }

};

window.addEventListener("load", function (){
  reloadTasks();
});
