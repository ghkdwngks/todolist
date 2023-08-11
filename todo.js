const todoMenu = document.querySelector(".todoMenu");
const todoClass = document.querySelector(".todoClass");
const inboxDiv = document.getElementById("inbox");
const todayDiv = document.getElementById("today");
const importantDiv = document.getElementById("important");
const inboxContainer = document.querySelector(".inboxContainer");
const todayContainer = document.querySelector(".todayContainer");
const importantContainer = document.querySelector(".importantContainer");
const showAddOptions = document.querySelector(".showAddOptions");
const addInput = document.querySelector(".addInput");
const setButtons = document.querySelector(".setButtons");
const cancelBtn = document.querySelector(".cancelBtn");
const setDeadLine = document.querySelector(".setDeadLine");
const deadlineModal = document.querySelector(".deadlineModal");
const setPriority = document.querySelector(".setPriority");
const priorityModal = document.querySelector(".priorityModal");
const showFinTodos = document.querySelector(".showFinTodos");
const finTodoUl = document.querySelector(".finTodoUl");

todoMenu.addEventListener("click", () => {
  if (todoClass.style.display === "none" || todoClass.style.display === "") {
    todoClass.style.display = "block";
  } else {
    todoClass.style.display = "none";
  }
});

inboxDiv.addEventListener("click", () => {
  window.location.href = "index.html";
});

todayDiv.addEventListener("click", () => {
  window.location.href = "today.html";
});

importantDiv.addEventListener("click", () => {
  window.location.href = "important.html";
});

showAddOptions.addEventListener("click", () => {
  setButtons.style.display = "flex";
});

addInput.addEventListener("focus", () => {
  setButtons.style.display = "flex";
});

setDeadLine.addEventListener("click", () => {
  if (
    deadlineModal.style.display === "none" ||
    deadlineModal.style.display === ""
  ) {
    deadlineModal.style.display = "block";
    priorityModal.style.display = "none";
  } else {
    deadlineModal.style.display = "none";
  }
});

setPriority.addEventListener("click", () => {
  if (
    priorityModal.style.display === "none" ||
    priorityModal.style.display === ""
  ) {
    priorityModal.style.display = "block";
    deadlineModal.style.display = "none";
  } else {
    priorityModal.style.display = "none";
  }
});

cancelBtn.addEventListener("click", () => {
  setButtons.style.display = "none";
  deadlineModal.style.display = "none";
  priorityModal.style.display = "none";
});

showFinTodos.addEventListener("click", () => {
  if (finTodoUl.style.display === "none" || finTodoUl.style.display === "") {
    finTodoUl.style.display = "block";
    showFinTodos.innerText = "▽";
  } else {
    finTodoUl.style.display = "none";
    showFinTodos.innerText = "▷";
  }
});
