const todoMenu = document.querySelector(".todoMenu");
const todoClass = document.querySelector(".todoClass");
const inboxDiv = document.getElementById("inbox");
const todayDiv = document.getElementById("today");
const importantDiv = document.getElementById("important");
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
const priority1 = document.getElementById("p1");
const priority2 = document.getElementById("p2");
const priority3 = document.getElementById("p3");
const priority4 = document.getElementById("p4");
const countFinTodos = document.querySelector(".countFinTodos");
const inboxClass = document.getElementById("inbox");
const todayClass = document.getElementById("today");
const importantClass = document.getElementById("important");

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
    deadline: "",
    priority: "p4",
  };

  if (currentDeadlineType) {
    newTodo.deadline = currentDeadlineType;
  }
  if (currentPriorityType) {
    newTodo.priority = currentPriorityType;
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
    todolist[todoIndex].completed = true;
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

function addPriority(priorityType) {
  if (priorityType === "p1") {
    setPriority.className = "p1img";
    currentPriorityType = "p1";
  } else if (priorityType === "p2") {
    setPriority.className = "p2img";
    currentPriorityType = "p2";
  } else if (priorityType === "p3") {
    setPriority.className = "p3img";
    currentPriorityType = "p3";
  } else if (priorityType === "p4") {
    setPriority.className = "p4img";
    currentPriorityType = "p4";
  }

  priorityModal.style.display = "none";
}

function displayDayOfWeek() {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayDayOfWeek = daysOfWeek[today.getDay()];
  const tomorrowDayOfWeek = daysOfWeek[tomorrow.getDay()];

  document.getElementById("todayDate").textContent = todayDayOfWeek;
  document.getElementById("tomorrowDate").textContent = tomorrowDayOfWeek;
}

function displayTodos() {
  todosUl.innerHTML = "";
  finTodoUl.innerHTML = "";

  let inboxCount = 0;
  let todayCount = 0;
  let importantCount = 0;
  let finCount = 0;

  todolist.forEach((todo) => {
    if (todo.completed) {
      const finLi = document.createElement("li");
      finLi.classList.add("todoItem");
      finLi.innerHTML = `
        <div class="finCheckBox ${todo.priority}img" onclick="toggleUncomplete(${todo.id})">
          <img src="imgs/check.png" class="checkBoxImg" />
        </div>
        <div class="finTodoText">${todo.text}</div>
        <div class="showDeadline">${todo.deadline}</div>
      `;
      finTodoUl.appendChild(finLi);
      finCount++;
    } else {
      const li = document.createElement("li");
      li.classList.add("todoItem");
      li.innerHTML = `
        <div class="checkBox ${todo.priority}img" onclick="toggleComplete(${todo.id})"></div>
        <div class="todoText">${todo.text}</div>
        <div class="showDeadline">${todo.deadline}</div>
      `;
      todosUl.appendChild(li);

      if (todo.deadline === "Today") {
        todayCount++;
      }
      if (todo.priority === "p1") {
        importantCount++;
      }
      inboxCount++;
    }
  });

  inboxClass.querySelector(".todoClassCount").textContent = inboxCount;
  todayClass.querySelector(".todoClassCount").textContent = todayCount;
  importantClass.querySelector(".todoClassCount").textContent = importantCount;

  countFinTodos.textContent = finCount;
  displayDayOfWeek();
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

priority1.addEventListener("click", () => {
  addPriority("p1");
});

priority2.addEventListener("click", () => {
  addPriority("p2");
});

priority3.addEventListener("click", () => {
  addPriority("p3");
});

priority4.addEventListener("click", () => {
  addPriority("p4");
});
