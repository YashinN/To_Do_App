const user = document.getElementById("username");
const confirmButton = document.getElementById("confirm-button");
const welcomeMsg = document.getElementById("welcome-message");
const mainContainer = document.getElementById("main-container");
const taskList = document.getElementById("task-list");
let userHour;
let userMin;
let userName;
let edit = false;
let editVal;
let el;
let totalTasks = 0;
const d = new Date();

user.addEventListener("input", function () {
  welcomeMsg.innerText = `Hello! ${user.value}`;
  if (!user.value) {
    welcomeMsg.innerText = "Welcome,please enter your name!";
  }
  /*Check usernamevalue*/
});

confirmButton.addEventListener("click", function () {
  userName = user.value;
  const welcomeContainer = document.getElementById("container-welcome");
  if (!userName) {
    alert("Please fill in username!");
  } else {
    welcomeContainer.style.display = "none";
    mainContainer.style.display = "block";
    // userDisplay.innerText = userName;
    userHour = d.getHours();
  }
  console.log(userName);
});

const userDisplay = document.querySelector("h4");

// ********** Modal Open *********
const addListButton = document.getElementById("add-button");
// addListButton.scrollIntoView({
//   behavior: "smooth",
// });
const modal = document.querySelector(".modal");
addListButton.addEventListener("click", function () {
  mainContainer.style.display = "none";
});

// ********** Modal close *********

const modalClose = document.getElementById("modal-close");
const taskEntry = document.getElementById("task-entry");

taskEntry.addEventListener("input", function () {
  if (taskEntry.value === "") {
    modalClose.disabled = true;
  } else {
    modalClose.disabled = false;
  }
});

modalClose.addEventListener("click", function () {
  if (!edit) {
    // mainContainer.style.display = "block";
    addTask();
    totalTasks += 1;
    setTimeout(function () {
      taskList.firstElementChild.scrollIntoView({ behavior: "smooth" });
    });
    // taskList.children[0].scrollIntoView();
    // taskEntry.value = "";
    // modalClose.disabled = "true";
  } else {
    el.value = taskEntry.value;
    setTimeout(function () {
      el.scrollIntoView({ behavior: "smooth" });
    });
    // mainContainer.style.display = "block";
    // taskEntry.value = "";
    // modalClose.disabled = "true";
    edit = false;
  }

  mainContainer.style.display = "block";
  taskEntry.value = "";
  modalClose.disabled = "true";
});

// ********** Add task to main screen

function addTask() {
  const newItem = document.createElement("li");
  const newTask = document.createElement("input");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const newRadio = document.createElement("input");
  newRadio.type = "checkbox";
  newRadio.classList.add("task-completed");
  newRadio.id = "radio";
  newTask.type = "text";
  newTask.classList.add("form-control");
  newTask.value = taskEntry.value;
  taskList.appendChild(newItem);
  newItem.append(newRadio);
  newItem.append(newTask);
  deleteButton.innerHTML = `<img id = "delete-button" class = "action-icon"src="/delete2.png">`;
  deleteButton.classList.add("action-button");
  newItem.append(deleteButton);
  editButton.innerHTML = `<img id = "edit-button" class = "action-icon"src="/edit1.png" data-bs-toggle="modal" data-bs-target="#staticBackdrop">`;
  editButton.classList.add("action-button");
  deleteButton.after(editButton);
  newTask.readOnly = "true";
}

function scroll() {}

taskList.addEventListener("click", function (e) {
  if (e.target.id === "delete-button") {
    e.target.parentElement.parentElement.remove();
    // deleteItem.remove();
  } else if (e.target.id === "edit-button") {
    const editItem = e.target.parentElement.parentElement;
    const val = editItem.children[1].value;
    el = editItem.children[1];
    // console.log(val);
    console.log(editItem.children[1].value);
    edit = true;
    mainContainer.style.display = "none";
    editTask(val);
    // a = "original task";
    // editTask(a);
  }
});

function editTask(val1) {
  taskEntry.value = val1;
}

// ********Mark task as completed *******

taskList.addEventListener("click", function (e) {
  if (e.target.id === "radio") {
    if (e.target.checked === true) {
      e.target.nextElementSibling.classList.add("completed-task");
    } else {
      e.target.nextElementSibling.classList.remove("completed-task");
    }
  }
});

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
