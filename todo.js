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
const addBtn = document.querySelector(".addBtn");
const todosUl = document.querySelector(".todos");
const setDate = document.querySelector(".setDate");
const setToday = document.getElementById("setToday");
const setTomorrow = document.getElementById("setTomorrow");
const setNextWeek = document.getElementById("setNextWeek");
const dModalTitle = document.querySelector(".dModalTitle");

let todolist = [];

if (localStorage.getItem("todolist")) {
  todolist = JSON.parse(localStorage.getItem("todolist"));
  displayTodos();
}

function addTodo() {
  const todoText = addInput.value;
  if (todoText === "") return;

  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
    deadline: "none",
    priority: "none",
  };

  if (currentDeadlineType) {
    newTodo.deadline = currentDeadlineType;
  }

  todolist.push(newTodo);
  saveTodos();
  displayTodos();

  addInput.value = "";
}

function saveTodos() {
  localStorage.setItem("todolist", JSON.stringify(todolist));
}

function toggleComplete(todoId) {
  const todoIndex = todolist.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todolist[todoIndex].completed = !todolist[todoIndex].completed;
    saveTodos();
    displayTodos();
  }
}

function toggleUncomplete(todoId) {
  const todoIndex = todolist.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todolist[todoIndex].completed = false;
    saveTodos();
    displayTodos();
  }
}

function addDeadLine(deadlineType) {
  if (deadlineType === "setToday") {
    setDeadLine.src = "imgs/today.png";
    currentDeadlineType = "Today";
  } else if (deadlineType === "setTomorrow") {
    setDeadLine.src = "imgs/tomorrow.png";
    currentDeadlineType = "Tomorrow";
  } else if (deadlineType === "setNextWeek") {
    setDeadLine.src = "imgs/nextWeek.png";
    currentDeadlineType = "Next Week";
  }

  deadlineModal.style.display = "none";
}

function displayTodos() {
  todosUl.innerHTML = "";
  finTodoUl.innerHTML = ""; // Clear the finished todo list

  todolist.forEach((todo) => {
    if (todo.completed) {
      const finLi = document.createElement("li");
      finLi.classList.add("todoItem");
      finLi.innerHTML = `
        <div class="finCheckBox" onclick="toggleUncomplete(${todo.id})">
          <img src="imgs/check.png" class="checkBoxImg" />
        </div>
        <div class="finTodoText">${todo.text}</div>
      `;
      finTodoUl.appendChild(finLi);
    } else {
      const li = document.createElement("li");
      li.classList.add("todoItem");
      li.innerHTML = `
        <div class="checkBox" onclick="toggleComplete(${todo.id})"></div>
        <div class="todoText">${todo.text}</div>
      `;
      todosUl.appendChild(li);
    }
  });
}

addBtn.addEventListener("click", () => {
  addTodo();
  setButtons.style.display = "none";
  deadlineModal.style.display = "none";
  priorityModal.style.display = "none";
});

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

setToday.addEventListener("click", () => {
  addDeadLine("setToday");
});

setTomorrow.addEventListener("click", () => {
  addDeadLine("setTomorrow");
});

setNextWeek.addEventListener("click", () => {
  addDeadLine("setNextWeek");
});

dModalTitle.addEventListener("click", () => {
  setDeadLine.src = "imgs/deadline.png";
  currentDeadlineType = "none";
  deadlineModal.style.display = "none";
});
