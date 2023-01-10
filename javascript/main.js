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
const modalerror = document.getElementById("modal-error");


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
});

dateEntry.addEventListener("input", function () {
  if (dateEntry.value === "") {
    dateEntry.style.color = "#5c9ead";
    timeEntry.disabled = true;
  } else {
    timeEntry.disabled = false;
    dateEntry.style.color = "white";
  }
  checkDisabled(timeEntry);

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
  // if(date.value !== "" && date.disabled === true){
  //   date.style.color = "white";
  // } else if(date.value !== ""){
  //   dateEntry.style.color = "#5c9ead";
  // }
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

    taskList.firstElementChild.id = taskPrefix + totalTasks;

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
    // write function

    const editedTask =
      document.getElementById(taskId).firstElementChild.nextSibling;

    taskStorage[taskId][0] = taskEntry.value;
    taskStorage[taskId][1] = dateEntry.value;
    taskStorage[taskId][2] = timeEntry.value;

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
  } else if (e.target.id === "edit-button") {
    setTimeout(function () {
      mainContainer.style.display = "none";;
    },100);
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

  
  
}
