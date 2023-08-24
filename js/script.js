const todoMenu = document.querySelector(".todoMenu");
const todoClass = document.querySelector(".todoClass");

const inboxDiv = document.getElementById("inbox");
const todayDiv = document.getElementById("today");
const importantDiv = document.getElementById("important");

const inboxType = document.getElementById("inboxType");
const todayType = document.getElementById("todayType");
const importantType = document.getElementById("importantType");

const showAddOptions = document.querySelector(".showAddOptions");
const addInput = document.querySelector(".addInput");

const setButtons = document.querySelector(".setButtons");
const addBtn = document.querySelector(".addBtn");
const delBtn = document.querySelector(".delBtn");
const cancelBtn = document.querySelector(".cancelBtn");

const setDeadLine = document.querySelector(".setDeadLine");
const deadlineModal = document.querySelector(".deadlineModal");
const dModalTitle = document.querySelector(".dModalTitle");

const setPriority = document.querySelector(".setPriority");
const priorityModal = document.querySelector(".priorityModal");

const showFinTodos = document.querySelector(".showFinTodos");

const finTodoUl = document.querySelector(".finTodoUl");
const todosUl = document.querySelector(".todos");

const setDate = document.querySelector(".setDate");
const setToday = document.getElementById("setToday");
const setTomorrow = document.getElementById("setTomorrow");
const setNextWeek = document.getElementById("setNextWeek");

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
const directDateInput = document.querySelector(".directDateInput");
const cancelEditBtn = document.querySelector(".cancelEditBtn");
const saveEditBtn = document.querySelector(".saveEditBtn");

const searchInput = document.querySelector(".searchInput");
const searchImg = document.querySelector(".searchImg");

let todolist = [];
let editTodoId = null;
let nowMonth = new Date();
let today = new Date();

let currentClass = "inbox";
const setCurrentClass = (newClass) => (currentClass = newClass);

if (localStorage.getItem("todolist")) {
  todolist = JSON.parse(localStorage.getItem("todolist"));
  displayTodos();
}

document.addEventListener("DOMContentLoaded", () => {
  showType("inboxType");
});

function addTodo() {
  const todoText = addInput.value;
  if (todoText === "") return;

  const setId = Date.now();

  const newTodo = {
    id: setId,
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

function deleteTodo() {
  const confirmation = confirm("정말 삭제하시겠습니까?");
  if (confirmation) {
    if (editTodoId !== null) {
      const todoIndex = todolist.findIndex((todo) => todo.id === editTodoId);
      if (todoIndex !== -1) {
        todolist.splice(todoIndex, 1);
        saveTodos();
        displayTodos();
        closeEditModal();
      }
    }
  }
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
  } else if (deadlineType === "none") {
    setDeadLine.src = "imgs/deadline.png";
    currentDeadlineType = "";
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

function handleDeadLine() {
  if (
    deadlineModal.style.display === "none" ||
    deadlineModal.style.display === ""
  ) {
    deadlineModal.style.display = "block";
    priorityModal.style.display = "none";
  } else {
    deadlineModal.style.display = "none";
  }
}

function handlePriority() {
  if (
    priorityModal.style.display === "none" ||
    priorityModal.style.display === ""
  ) {
    priorityModal.style.display = "block";
    deadlineModal.style.display = "none";
  } else {
    priorityModal.style.display = "none";
  }
}

function resetDeadlineAndPriority() {
  setDeadLine.src = "imgs/deadline.png";
  setPriority.className = "setPriority";
}

function displayDateInfo() {
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
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7));

  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = months[today.getMonth()];
  const day = today.getDate();

  const todayText = `${month} ${day}일 ${dayOfWeek}요일`;

  document.querySelector(".todayDate").textContent = todayText;
  document.getElementById("todayDate").textContent = dayOfWeek;
  document.getElementById("tomorrowDate").textContent =
    daysOfWeek[tomorrow.getDay()];
  document.getElementById("nextWeekDate").textContent = `월 ${
    nextMonday.getMonth() + 1
  }월 ${nextMonday.getDate()}일`;
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

function editTodos() {
  const updatedText = editTaskText.value;
  const updatedDeadline = editDeadlineSelect.value;
  const updatedPriority = editPrioritySelect.value;

  const todoIndex = todolist.findIndex((todo) => todo.id === editTodoId);
  if (todoIndex !== -1) {
    todolist[todoIndex].text = updatedText;

    if (updatedDeadline === "직접 입력") {
      const directDate = directDateInput.value;
      if (directDate) {
        const selectedDate = new Date(directDate);
        const selectedMonth = selectedDate.getMonth() + 1;
        const selectedDay = selectedDate.getDate();

        todolist[todoIndex].deadline = `${selectedMonth}월 ${selectedDay}일`;
      }
      todolist[todoIndex].deadlineImg = "imgs/calendar.png";
    } else {
      todolist[todoIndex].deadline = updatedDeadline;
      if (updatedDeadline === "오늘") {
        todolist[todoIndex].deadlineImg = "imgs/today.png";
      } else if (updatedDeadline === "내일") {
        todolist[todoIndex].deadlineImg = "imgs/tomorrow.png";
      } else if (updatedDeadline === "다음 주") {
        todolist[todoIndex].deadlineImg = "imgs/nextWeek.png";
      } else if (updatedDeadline === "") {
        todolist[todoIndex].deadlineImg = "";
      }
    }

    todolist[todoIndex].priority = updatedPriority;
    saveTodos();
    displayTodos();
    closeEditModal();
  }
}

function showDirectDateInput() {
  const selectedValue = this.value;
  if (selectedValue === "직접 입력") {
    directDateInput.style.display = "block";
  } else {
    directDateInput.style.display = "none";
  }
}

function handleDirectDateInput() {
  const selectedDate = directDateInput.value;
  if (selectedDate) {
    const formattedDate = `${
      new Date(selectedDate).getMonth() + 1
    }월 ${new Date(selectedDate).getDate()}일`;

    editDeadlineSelect.options[editDeadlineSelect.selectedIndex].text =
      formattedDate;
    directDateInput.style.display = "none";
  }
}

function handleTodoTextClick(event) {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("todoText")) {
    const todoId = Number(clickedElement.parentElement.dataset.todoId);
    openEditModal(todoId);
  }
}

function showType(typeToShow) {
  const types = ["inboxType", "todayType", "importantType"];

  types.forEach((type) => {
    const typeElement = document.getElementById(type);
    if (type === typeToShow) {
      typeElement.style.display = "block";
    } else {
      typeElement.style.display = "none";
    }
  });

  setCurrentClass(typeToShow);
  displayTodos();
}

function getAllTodos() {
  return todolist;
}

function getTodayTodos() {
  return todolist.filter((todo) => todo.deadline === "오늘");
}

function getImportantTodos() {
  return todolist.filter((todo) => todo.priority === "p1");
}

function handleFinTodos() {
  if (finTodoUl.style.display === "none" || finTodoUl.style.display === "") {
    finTodoUl.style.display = "block";
    showFinTodos.innerText = "▽";
  } else {
    finTodoUl.style.display = "none";
    showFinTodos.innerText = "▷";
  }
}

function searchTodos() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredTodos = todolist.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm)
  );

  displaySearchResults(filteredTodos);
}

function displaySearchResults(filteredTodos) {
  todosUl.innerHTML = "";
  finTodoUl.innerHTML = "";

  let finCount = 0;

  filteredTodos.forEach((todo) => {
    paintTodo(todo);

    if (todo.completed) {
      finCount++;
    }
  });

  countFinTodos.textContent = finCount;

  const todoTypeImg = document.querySelector(".todoTypeImg");
  const inboxTitle = document.querySelector(".inboxTitle");

  if (todoTypeImg) {
    todoTypeImg.src = "imgs/search.png";
  }

  if (inboxTitle) {
    inboxTitle.textContent = `"${searchInput.value}" 검색 결과`;
  }
}

function paintTodo(todo) {
  let inboxCount = 0;
  let todayCount = 0;
  let importantCount = 0;
  let finCount = 0;

  if (todo.completed) {
    const finLi = document.createElement("li");
    finLi.classList.add("todoItem");
    finLi.innerHTML = `
        <div class="finCheckBox ${
          todo.priority
        }img" onclick="toggleUncomplete(${todo.id})">
          <img src="imgs/check.png" class="checkBoxImg" />
        </div>
        <div class="finTodoText">${todo.text}</div>
        <div class="todoDeadLine">
        ${
          todo.deadlineImg
            ? `<img class="deadlineImg" src="${todo.deadlineImg}" />`
            : ""
        }
        <div class="showDeadline">${todo.deadline}</div>
        </div>
      `;

    finTodoUl.appendChild(finLi);
  } else {
    const li = document.createElement("li");
    li.classList.add("todoItem");
    li.dataset.todoId = todo.id;

    li.innerHTML = `
        <div class="checkBox ${todo.priority}img" onclick="toggleComplete(${
      todo.id
    })"></div>
        <div class="todoText">${todo.text}</div>
        <div class="todoDeadLine">
        ${
          todo.deadlineImg
            ? `<img class="deadlineImg" src="${todo.deadlineImg}" />`
            : ""
        }
        <div class="showDeadline">${todo.deadline}</div>
        </div>
      `;

    todosUl.appendChild(li);
  }

  updateTodoCounts();
  displayDateInfo();
}

function updateTodoCounts() {
  const inboxCount = todolist.filter((todo) => !todo.completed).length;
  const todayCount = todolist.filter(
    (todo) => todo.deadline === "오늘" && !todo.completed
  ).length;
  const importantCount = todolist.filter(
    (todo) => todo.priority === "p1" && !todo.completed
  ).length;
  const finCount = todolist.filter((todo) => todo.completed).length;

  inboxClass.querySelector(".todoClassCount").textContent = inboxCount;
  todayClass.querySelector(".todoClassCount").textContent = todayCount;
  importantClass.querySelector(".todoClassCount").textContent = importantCount;
  countFinTodos.textContent = finCount;
}

function setDisplayNone() {
  setButtons.style.display = "none";
  deadlineModal.style.display = "none";
  priorityModal.style.display = "none";
}

function showClassMenu() {
  if (todoClass.style.display === "none" || todoClass.style.display === "") {
    todoClass.style.display = "block";
  } else {
    todoClass.style.display = "none";
  }
}

function hideSetButtons() {
  setButtons.style.display = "flex";
}

function displayTodos() {
  todosUl.innerHTML = "";
  finTodoUl.innerHTML = "";

  let filteredTodos = [];

  switch (currentClass) {
    case "inboxType":
      filteredTodos = getAllTodos();
      break;
    case "todayType":
      filteredTodos = getTodayTodos();
      break;
    case "importantType":
      filteredTodos = getImportantTodos();
      break;
    default:
      break;
  }

  filteredTodos.forEach((todo) => {
    paintTodo(todo);
  });
}

function showTodoClass(e) {
  const currentClass = e.target;
  const newClass = currentClass.id;

  if (currentClass === newClass) return;

  setCurrentClass(newClass);

  displayTodos();
}

function init() {
  addBtn.addEventListener("click", () => {
    addTodo(), setDisplayNone(), resetDeadlineAndPriority();
  });

  delBtn.addEventListener("click", () => {
    deleteTodo();
  });

  todoMenu.addEventListener("click", showClassMenu);

  inboxDiv.addEventListener("click", () => {
    showType("inboxType");
  });

  todayDiv.addEventListener("click", () => {
    showType("todayType");
  });

  importantDiv.addEventListener("click", () => {
    showType("importantType");
  });

  searchImg.addEventListener("click", searchTodos);

  showAddOptions.addEventListener("click", hideSetButtons);
  addInput.addEventListener("focus", hideSetButtons);
  setDeadLine.addEventListener("click", handleDeadLine);
  setPriority.addEventListener("click", handlePriority);

  cancelBtn.addEventListener("click", () => {
    setDisplayNone();
    resetDeadlineAndPriority();
  });
  showFinTodos.addEventListener("click", handleFinTodos);
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
    addDeadLine("none");
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
  cancelEditBtn.addEventListener("click", closeEditModal);
  editDeadlineSelect.addEventListener("change", showDirectDateInput);

  directDateInput.addEventListener("change", handleDirectDateInput);
  saveEditBtn.addEventListener("click", editTodos);
  todosUl.addEventListener("click", handleTodoTextClick);
  buildCalendar();
}

init();