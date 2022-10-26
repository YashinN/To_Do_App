const user = document.getElementById("username");
const confirmButton = document.getElementById("confirm-button");
const welcomeMsg = document.getElementById("welcome-message");
const mainContainer = document.getElementById("main-container");
let userName;

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
    userDisplay.innerText = userName;
  }
  console.log(userName);
});

const userDisplay = document.querySelector("h4");

// ********** Modal Open *********
const addListButton = document.getElementById("add-button");
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
  mainContainer.style.display = "block";
  addTask();
  taskEntry.value = "";
  modalClose.disabled = "true";
  const time = document.getElementById("time");
  console.log(time.value);
});

// ********** Add task to main screen

function addTask() {
  const newItem = document.createElement("li");
  const newTask = document.createElement("input");
  const taskList = document.getElementById("task-list");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  newTask.type = "text";
  newTask.classList.add("form-control");
  newTask.value = taskEntry.value;
  taskList.appendChild(newItem);
  newItem.append(newTask);
  deleteButton.innerHTML = `<img class = "delete-icon"src="/delete2.png">`;
  deleteButton.classList.add("delete-button");
  newItem.append(deleteButton);
  editButton.innerHTML = `<img class = "delete-icon"src="/edit1.png">`;
  editButton.classList.add("delete-button");
  deleteButton.after(editButton);
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
