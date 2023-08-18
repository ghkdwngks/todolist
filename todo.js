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
const editModal = document.querySelector(".editModal");
const editTaskText = document.querySelector(".editTaskText");
const editDeadlineSelect = document.querySelector(".editDeadlineSelect");
const editPrioritySelect = document.querySelector(".editPrioritySelect");
const cancelEditBtn = document.querySelector(".cancelEditBtn");
const saveEditBtn = document.querySelector(".saveEditBtn");
const searchInput = document.querySelector(".searchInput");
const searchImg = document.querySelector(".searchImg");

let todolist = [];
let editTodoId = null;
let nowMonth = new Date();
let today = new Date();
today.setHours(0, 0, 0, 0);

if (localStorage.getItem("todolist")) {
  todolist = JSON.parse(localStorage.getItem("todolist"));
  displayTodos();
}

window.onload = function () {
  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "index.html") {
    displayAllTodos();
  } else if (currentPage === "today.html") {
    displayTodayTodos();
  } else if (currentPage === "important.html") {
    displayImportantTodos();
  }

  buildCalendar();
};

function addTodo() {
  const todoText = addInput.value;
  if (todoText === "") return;

  const newTodo = {
    id: Date.now(),
    text: todoText,
    completed: false,
    deadline: "",
    deadlineImg: "",
    priority: "p4",
  };

  if (currentDeadlineType) {
    newTodo.deadline = currentDeadlineType;
  }

  if (newTodo.deadline !== "") {
    if (setDeadLine.src) {
      newTodo.deadlineImg = setDeadLine.src;
    }
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

function buildCalendar() {
  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);

  let tbody_Calendar = document.querySelector(".Calendar > tbody");
  document.getElementById("calYear").innerText = nowMonth.getFullYear();
  document.getElementById("calMonth").innerText = leftPad(
    nowMonth.getMonth() + 1
  );

  while (tbody_Calendar.rows.length > 0) {
    tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
  }

  let nowRow = tbody_Calendar.insertRow();

  for (let j = 0; j < firstDate.getDay(); j++) {
    let nowColumn = nowRow.insertCell();
  }

  for (
    let nowDay = firstDate;
    nowDay <= lastDate;
    nowDay.setDate(nowDay.getDate() + 1)
  ) {
    let nowColumn = nowRow.insertCell();

    let newDIV = document.createElement("p");
    newDIV.innerHTML = leftPad(nowDay.getDate());
    nowColumn.appendChild(newDIV);

    if (nowDay.getDay() == 6) {
      nowRow = tbody_Calendar.insertRow();
    }

    if (nowDay < today) {
      newDIV.className = "pastDay";
    } else if (
      nowDay.getFullYear() == today.getFullYear() &&
      nowDay.getMonth() == today.getMonth() &&
      nowDay.getDate() == today.getDate()
    ) {
      newDIV.className = "today";
      newDIV.onclick = function () {
        choiceDate(this);
      };
    } else {
      newDIV.className = "futureDay";
      newDIV.onclick = function () {
        choiceDate(this);
      };
    }
  }
}

function choiceDate(newDIV) {
  if (document.getElementsByClassName("choiceDay")[0]) {
    document
      .getElementsByClassName("choiceDay")[0]
      .classList.remove("choiceDay");
  }
  newDIV.classList.add("choiceDay");

  const selectedDay = parseInt(newDIV.textContent);
  const selectedMonth = nowMonth.getMonth() + 1;

  addDeadLine("setCalendarDate", selectedMonth, selectedDay);
}

function prevCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() - 1,
    nowMonth.getDate()
  );
  buildCalendar();
}
function nextCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() + 1,
    nowMonth.getDate()
  );
  buildCalendar();
}

function leftPad(value) {
  if (value < 10) {
    value = "0" + value;
    return value;
  }
  return value;
}

function addDeadLine(deadlineType, month, day) {
  if (deadlineType === "setToday") {
    setDeadLine.src = "imgs/today.png";
    currentDeadlineType = "오늘";
  } else if (deadlineType === "setTomorrow") {
    setDeadLine.src = "imgs/tomorrow.png";
    currentDeadlineType = "내일";
  } else if (deadlineType === "setNextWeek") {
    setDeadLine.src = "imgs/nextWeek.png";
    currentDeadlineType = "다음 주";
  } else if (deadlineType === "setCalendarDate") {
    setDeadLine.src = "imgs/calendar.png";
    currentDeadlineType = `${month}월 ${day}일`;
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

function resetDeadlineAndPriority() {
  setDeadLine.src = "imgs/deadline.png";
  setPriority.className = "setPriority";
}

function displayDayOfWeek() {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  const today = new Date();
  const tomorrow = new Date();
  const nextMonday = new Date(today);

  tomorrow.setDate(tomorrow.getDate() + 1);
  nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));

  const todayDayOfWeek = daysOfWeek[today.getDay()];
  const tomorrowDayOfWeek = daysOfWeek[tomorrow.getDay()];
  const nextMondayMonth = nextMonday.getMonth() + 1;
  const nextMondayDay = nextMonday.getDate();

  document.getElementById("todayDate").textContent = todayDayOfWeek;
  document.getElementById("tomorrowDate").textContent = tomorrowDayOfWeek;
  document.getElementById(
    "nextWeekDate"
  ).textContent = `월 ${nextMondayMonth}월 ${nextMondayDay}일`;
}

function displayTodayDate() {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const today = new Date();

  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const day = today.getDate();

  const todayText = `${month} ${day}일 ${dayOfWeek}요일`;

  const todayElement = document.querySelector(".todayDate");
  if (todayElement) {
    todayElement.textContent = todayText;
  }
}

function openEditModal(todoId) {
  editTodoId = todoId;
  const todo = todolist.find((todo) => todo.id === todoId);
  if (todo) {
    editTaskText.value = todo.text;
    editDeadlineSelect.value = todo.deadline;
    editPrioritySelect.value = todo.priority;
    editModal.style.display = "block";
  }
}

function closeEditModal() {
  editModal.style.display = "none";
  editTodoId = null;
}

function displayAllTodos() {
  displayTodos(todolist);
}

function displayTodayTodos() {
  const todayTodos = todolist.filter((todo) => todo.deadline === "오늘");
  displayTodos(todayTodos);
}

function displayImportantTodos() {
  const importnatTodos = todolist.filter((todo) => todo.priority === "p1");
  displayTodos(importnatTodos);
}

searchImg.addEventListener("click", () => {
  searchTodos();
});

function searchTodos() {
  const searchText = searchInput.value.trim();
  if (searchText !== "") {
    displayFilteredTodos(searchText);
  } else {
    displayTodos();
  }
}

function displayFilteredTodos(searchText) {
  todosUl.innerHTML = "";
  finTodoUl.innerHTML = "";

  let inboxCount = 0;
  let todayCount = 0;
  let importantCount = 0;
  let finCount = 0;

  todolist.forEach((todo) => {
    if (todo.text.includes(searchText)) {
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

        if (todo.deadlineImg && todo.deadlineImg !== "") {
          const setDeadLineImg = document.createElement("img");
          setDeadLineImg.className = "setDeadLine";
          setDeadLineImg.src = todo.deadlineImg;
          finLi.appendChild(setDeadLineImg);
        }

        finTodoUl.appendChild(finLi);
        finCount++;
      } else {
        const li = document.createElement("li");
        li.classList.add("todoItem");
        li.dataset.todoId = todo.id;

        li.innerHTML = `
          <div class="checkBox ${todo.priority}img" onclick="toggleComplete(${todo.id})"></div>
          <div class="todoText">${todo.text}</div>
          <div class="showDeadline">${todo.deadline}</div>
        `;

        if (todo.deadlineImg && todo.deadlineImg !== "") {
          const setDeadLineImg = document.createElement("img");
          setDeadLineImg.className = "setDeadLine";
          setDeadLineImg.src = todo.deadlineImg;
          li.appendChild(setDeadLineImg);
        }

        todosUl.appendChild(li);

        if (todo.deadline === "오늘") {
          todayCount++;
        }
        if (todo.priority === "p1") {
          importantCount++;
        }
        inboxCount++;
      }
    }
  });

  inboxClass.querySelector(".todoClassCount").textContent = inboxCount;
  todayClass.querySelector(".todoClassCount").textContent = todayCount;
  importantClass.querySelector(".todoClassCount").textContent = importantCount;

  countFinTodos.textContent = finCount;
}

function displayTodos(filteredTodos) {
  todosUl.innerHTML = "";
  finTodoUl.innerHTML = "";

  if (!filteredTodos) {
    return;
  }

  let inboxCount = 0;
  let todayCount = 0;
  let importantCount = 0;
  let finCount = 0;

  filteredTodos.forEach((todo) => {
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

      if (todo.deadlineImg && todo.deadlineImg !== "") {
        const setDeadLineImg = document.createElement("img");
        setDeadLineImg.className = "setDeadLine";
        setDeadLineImg.src = todo.deadlineImg;
        finLi.appendChild(setDeadLineImg);
      }

      finTodoUl.appendChild(finLi);
      finCount++;
    } else {
      const li = document.createElement("li");
      li.classList.add("todoItem");
      li.dataset.todoId = todo.id;

      li.innerHTML = `
        <div class="checkBox ${todo.priority}img" onclick="toggleComplete(${todo.id})"></div>
        <div class="todoText">${todo.text}</div>
        <div class="showDeadline">${todo.deadline}</div>
      `;

      if (todo.deadlineImg && todo.deadlineImg !== "") {
        const setDeadLineImg = document.createElement("img");
        setDeadLineImg.className = "setDeadLine";
        setDeadLineImg.src = todo.deadlineImg;
        li.appendChild(setDeadLineImg);
      }

      todosUl.appendChild(li);

      if (todo.deadline === "오늘") {
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
  displayTodayDate();
}

addBtn.addEventListener("click", () => {
  addTodo();
  setButtons.style.display = "none";
  deadlineModal.style.display = "none";
  priorityModal.style.display = "none";

  resetDeadlineAndPriority();
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

  resetDeadlineAndPriority();
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
  currentDeadlineType = "";
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

cancelEditBtn.addEventListener("click", () => {
  closeEditModal();
});

saveEditBtn.addEventListener("click", () => {
  const updatedText = editTaskText.value;
  const updatedDeadline = editDeadlineSelect.value;
  const updatedPriority = editPrioritySelect.value;

  const todoIndex = todolist.findIndex((todo) => todo.id === editTodoId);
  if (todoIndex !== -1) {
    todolist[todoIndex].text = updatedText;
    todolist[todoIndex].deadline = updatedDeadline;
    todolist[todoIndex].priority = updatedPriority;
    saveTodos();
    displayTodos();
    closeEditModal();
  }
});

todosUl.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("todoText")) {
    const todoId = Number(clickedElement.parentElement.dataset.todoId);
    openEditModal(todoId);
  }
});
