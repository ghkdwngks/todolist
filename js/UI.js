import TodoList from "./todos.js";

const todoList = new TodoList();

const addInput = document.querySelector(".addInput");
const setButtons = document.querySelector(".setButtons");

const setDeadLine = document.querySelector(".setDeadLine");
const deadlineModal = document.querySelector(".deadlineModal");
const deadlineOptions = document.querySelectorAll(".setDate");
const dModalTitle = document.querySelector(".dModalTitle");

const setPriority = document.querySelector(".setPriority");
const priorityModal = document.querySelector(".priorityModal");
const priorityOptions = document.querySelectorAll(".priority");

const addBtn = document.querySelector(".addBtn");
const cancelBtn = document.querySelector(".cancelBtn");

const todosUl = document.querySelector(".todos");
const finTodosUl = document.querySelector(".finTodoUl");

const showFinTodos = document.querySelector(".showFinTodos");

const todoMenu = document.querySelector(".todoMenu");
const todoClass = document.querySelector(".todoClass");

const inboxDiv = document.getElementById("inbox");
const todayDiv = document.getElementById("today");
const importantDiv = document.getElementById("important");

const searchInput = document.querySelector(".searchInput");
const searchImg = document.querySelector(".searchImg");

const editModal = document.querySelector(".editModal");
const editTaskText = document.querySelector(".editTaskText");
const editDeadlineSelect = document.querySelector(".editDeadlineSelect");
const editPrioritySelect = document.querySelector(".editPrioritySelect");

const saveEditBtn = document.querySelector(".saveEditBtn");
const cancelEditBtn = document.querySelector(".cancelEditBtn");
const delBtn = document.querySelector(".delBtn");

const prevCalendar = document.querySelector(".prevCalendar");
const nextCalendar = document.querySelector(".nextCalendar");

let currentDeadlineType = "";
let currentDeadlineImgType = "";
let currentPriorityType = "";

let editTodo = null;
let nowMonth = new Date();
let today = new Date();

let currentClass = "inbox";
const setCurrentClass = (newClass) => (currentClass = newClass);

const loadTodosAndPaint = () => {
  todoList.loadTodos();
  showType("inboxType");
  paintTodo();
};

addInput.addEventListener("focus", () => {
  setButtons.style.display = "flex";
});

addBtn.addEventListener("click", () => {
  const content = addInput.value.trim();
  if (content !== "") {
    todoList.addTodo(
      content,
      currentDeadlineType,
      currentDeadlineImgType,
      currentPriorityType
    );
    addInput.value = "";
    setButtons.style.display = "none";
    currentDeadlineType = "";
    currentDeadlineImgType = "";
    currentPriorityType = "p4";
  }
  paintTodo();

  setDeadLine.src = "imgs/deadline.png";
  setPriority.className = "p4img";
});

cancelBtn.addEventListener("click", () => {
  setButtons.style.display = "none";
  deadlineModal.style.display = "none";
  priorityModal.style.display = "none";

  setDeadLine.src = "imgs/deadline.png";
  setPriority.className = "p4img";
});

setDeadLine.addEventListener("click", () => {
  if (deadlineModal.style.display === "none") {
    deadlineModal.style.display = "block";
    priorityModal.style.display = "none";
  } else {
    deadlineModal.style.display = "none";
  }
});

deadlineOptions.forEach((option) => {
  option.addEventListener("click", () => {
    switch (option.id) {
      case "setToday":
        currentDeadlineType = "오늘";
        break;
      case "setTomorrow":
        currentDeadlineType = "내일";
        break;
      case "setNextWeek":
        currentDeadlineType = "다음 주";
        break;
    }
    currentDeadlineImgType = option.querySelector(".deadlineImg").src;
    deadlineModal.style.display = "none";
    setDeadLine.src = currentDeadlineImgType;
  });
});

dModalTitle.addEventListener("click", () => {
  currentDeadlineType = "";
  currentDeadlineImgType = "";
  setDeadLine.src = "imgs/deadline.png";
  deadlineModal.style.display = "none";
});

setPriority.addEventListener("click", () => {
  if (priorityModal.style.display === "none") {
    priorityModal.style.display = "block";
    deadlineModal.style.display = "none";
  } else {
    priorityModal.style.display = "none";
  }
});

priorityOptions.forEach((option) => {
  option.addEventListener("click", () => {
    switch (option.id) {
      case "p1":
        currentPriorityType = "p1";
        setPriority.className = "p1img";
        break;
      case "p2":
        currentPriorityType = "p2";
        setPriority.className = "p2img";
        break;
      case "p3":
        currentPriorityType = "p3";
        setPriority.className = "p3img";
        break;
      case "p4":
        currentPriorityType = "p4";
        setPriority.className = "p4img";
        break;
    }
    priorityModal.style.display = "none";
  });
});

const buildCalendar = () => {
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
};

const choiceDate = (newDIV) => {
  if (document.getElementsByClassName("choiceDay")[0]) {
    document
      .getElementsByClassName("choiceDay")[0]
      .classList.remove("choiceDay");
  }
  newDIV.classList.add("choiceDay");

  const selectedMonth = nowMonth.getMonth() + 1;
  const selectedDay = parseInt(newDIV.textContent);
  const formattedDeadline = `${selectedMonth}월 ${selectedDay}일`;

  currentDeadlineType = formattedDeadline;
  deadlineModal.style.display = "none";
  setDeadLine.src = "imgs/calendar.png";
};

prevCalendar.addEventListener("click", () => {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() - 1,
    nowMonth.getDate()
  );
  buildCalendar();
});

nextCalendar.addEventListener("click", () => {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() + 1,
    nowMonth.getDate()
  );
  buildCalendar();
});

const leftPad = (value) => {
  if (value < 10) {
    value = "0" + value;
    return value;
  }
  return value;
};

const displayDateInfo = () => {
  const todayDay = document.getElementById("todayDay");
  const tomorrowDay = document.getElementById("tomorrowDay");
  const nextWeekDay = document.getElementById("nextWeekDay");
  const todayDate = document.querySelector(".todayDate");

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentDayName = weekdays[currentDayOfWeek];

  todayDay.textContent = currentDayName;

  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);
  const tomorrowDayOfWeek = tomorrowDate.getDay();
  const tomorrowDayName = weekdays[tomorrowDayOfWeek];
  tomorrowDay.textContent = tomorrowDayName;

  const nextMonday = new Date(currentDate);
  nextMonday.setDate(currentDate.getDate() + ((1 + 7 - currentDayOfWeek) % 7));
  const nextMondayMonth = nextMonday.getMonth() + 1;
  const nextMondayDay = nextMonday.getDate();
  nextWeekDay.textContent = `${nextMondayMonth}월 ${nextMondayDay}일 월`;

  todayDate.textContent = `${currentMonth}월 ${currentDay}일 ${currentDayName}요일`;
};

todoMenu.addEventListener("click", () => {
  if (todoClass.style.display === "none" || todoClass.style.display === "") {
    todoClass.style.display = "block";
  } else {
    todoClass.style.display = "none";
  }
});

const showType = (typeToShow) => {
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
};

inboxDiv.addEventListener("click", () => {
  showType("inboxType");
  paintTodo();
});

todayDiv.addEventListener("click", () => {
  showType("todayType");
  paintTodo();
});

importantDiv.addEventListener("click", () => {
  showType("importantType");
  paintTodo();
});

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    paintTodo();
  }
});

searchImg.addEventListener("click", () => {
  paintTodo();
});

showFinTodos.addEventListener("click", () => {
  if (finTodosUl.style.display === "none" || finTodosUl.style.display === "") {
    finTodosUl.style.display = "block";
    showFinTodos.innerText = "▽";
  } else {
    finTodosUl.style.display = "none";
    showFinTodos.innerText = "▷";
  }
});

const paintTodo = () => {
  todosUl.innerHTML = "";
  finTodosUl.innerHTML = "";

  let filteredTodos = [];

  switch (currentClass) {
    case "inboxType":
      filteredTodos = todoList.getAllTodos();
      break;
    case "todayType":
      filteredTodos = todoList.getTodayTodos();
      break;
    case "importantType":
      filteredTodos = todoList.getImportantTodos();
      break;
    default:
      break;
  }

  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm) {
    const todoTypeImg = document.querySelector(".todoTypeImg");
    const inboxTitle = document.querySelector(".inboxTitle");
    const addTodoDiv = document.querySelector(".addTodoDiv");

    if (todoTypeImg) {
      todoTypeImg.src = "imgs/search.png";
    }

    if (inboxTitle) {
      inboxTitle.textContent = `"${searchInput.value}" 검색 결과`;
    }

    addTodoDiv.style.display = "none";
    filteredTodos = todoList.searchTodos(searchTerm);
  }

  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todoItem");
    li.addEventListener("click", () => {
      openEditModal(todo);
    });

    const checkBox = document.createElement("div");
    checkBox.classList.add("checkBox", `${todo.priority}img`);
    checkBox.addEventListener("click", (event) => {
      event.stopPropagation();
      todoList.toggleCompletion(todo.id);
      paintTodo();
    });

    const todoContent = document.createElement("div");
    todoContent.classList.add("todoContent");
    todoContent.textContent = todo.content;

    const todoDeadLineImg = document.createElement("div");
    todoDeadLineImg.classList.add("todoDeadLineImg");
    todoDeadLineImg.innerHTML = `        ${
      todo.deadlineImg
        ? `<img class="deadlineImg" src="${todo.deadlineImg}" />`
        : ""
    }`;

    const todoDeadLine = document.createElement("div");
    todoDeadLine.classList.add("todoDeadLine");
    todoDeadLine.textContent = todo.deadline;

    li.appendChild(checkBox);
    li.appendChild(todoContent);
    li.appendChild(todoDeadLineImg);
    li.appendChild(todoDeadLine);

    if (todo.isCompleted) {
      checkBox.classList.add("finCheckBox");
      const checkImg = document.createElement("img");
      checkImg.classList.add("checkBoxImg");
      checkImg.src = "imgs/check.png";
      checkBox.appendChild(checkImg);
      finTodosUl.appendChild(li);
    } else {
      todosUl.appendChild(li);
    }
  });
  updateTodoCounts();
};

const updateTodoCounts = () => {
  const nowCount = todoList.getNowTodosCount();
  const todayCount = todoList.getTodayTodosCount();
  const importantCount = todoList.getImportantTodosCount();
  const completedCount = todoList.getCompletedTodosCount();

  inboxDiv.querySelector(".todoClassCount").textContent = nowCount;
  todayDiv.querySelector(".todoClassCount").textContent = todayCount;
  importantDiv.querySelector(".todoClassCount").textContent = importantCount;
  document.querySelector(".countFinTodos").textContent = completedCount;
};

const openEditModal = (todo) => {
  editTodo = todo;
  editModal.style.display = "block";

  editTaskText.value = todo.content;
  editDeadlineSelect.value = todo.deadline;
  editPrioritySelect.value = todo.priority;
};

editDeadlineSelect.addEventListener("change", () => {
  const selectedTxt = this.textContent;

  if (selectedTxt === "직접 선택") {
    const selectDateInput = document.createElement("input");
    selectDateInput.type = "date";
    selectDateInput.classList.add("selectDate");

    const editDeadline = document.querySelector(".editDeadline");
    editDeadline.appendChild(selectDateInput);

    selectDateInput.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const selectedMonth = selectedDate.getMonth() + 1;
      const selectedDay = selectedDate.getDate();

      editDeadlineSelect.value = `${selectedMonth}월 ${selectedDay}일`;
      editDeadline.removeChild(selectDateInput);
    });
  }
});

saveEditBtn.addEventListener("click", () => {
  if (editTodo) {
    const updatedContent = editTaskText.value;
    const updatedDeadline = editDeadlineSelect.value;
    const updatedPriority = editPrioritySelect.value;

    let updatedDeadlineImg = "";

    if (updatedDeadline === "오늘") {
      updatedDeadlineImg = "imgs/today.png";
    } else if (updatedDeadline === "내일") {
      updatedDeadlineImg = "imgs/tomorrow.png";
    } else if (updatedDeadline === "다음 주") {
      updatedDeadlineImg = "imgs/nextWeek.png";
    } else if (updatedDeadline === "직접 선택") {
      updatedDeadlineImg = "imgs/calendar.png";
    } else if (updatedDeadline === "") {
      updatedDeadlineImg = "";
    }

    todoList.updateTodo(
      editTodo.id,
      updatedContent,
      updatedDeadline,
      updatedDeadlineImg,
      updatedPriority
    );

    editModal.style.display = "none";
    paintTodo();
  }
});

cancelEditBtn.addEventListener("click", () => {
  editModal.style.display = "none";
});

delBtn.addEventListener("click", () => {
  const confirmation = confirm("정말 삭제하시겠습니까?");
  if (confirmation) {
    todoList.deleteTodo(editTodo.id);
    editModal.style.display = "none";
    paintTodo();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  loadTodosAndPaint();
  displayDateInfo();
  buildCalendar();
});
