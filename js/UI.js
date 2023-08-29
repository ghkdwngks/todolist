import TodoList from "./todos.js";

const todoList = new TodoList();

const addInput = document.querySelector(".addInput");
const setButtons = document.querySelector(".setButtons");

const setDeadLine = document.querySelector(".setDeadLine");
const deadlineModal = document.querySelector(".deadlineModal");
const deadlineOptions = document.querySelectorAll(".setDate");

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

let currentDeadlineType = "";
let currentDeadlineImgType = "";
let currentPriorityType = "";

const loadTodosAndPaint = () => {
  todoList.loadTodos();
  paintTodo();
};

addInput.addEventListener("focus", () => {
  setButtons.style.display = "flex";
});

setDeadLine.addEventListener("click", () => {
  deadlineModal.style.display = "block";
  priorityModal.style.display = "none";
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

setPriority.addEventListener("click", () => {
  priorityModal.style.display = "block";
  deadlineModal.style.display = "none";
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
});

cancelBtn.addEventListener("click", () => {
  setButtons.style.display = "none";
  deadlineModal.style.display = "none";
  priorityModal.style.display = "none";
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

  todoList.todolist.forEach((todo) => {
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
};

const openEditModal = (todo) => {
  const editModal = document.querySelector(".editModal");
  editModal.style.display = "block";

  const saveEditBtn = editModal.querySelector(".saveEditBtn");
  const editTaskText = document.querySelector(".editTaskText");
  const editDeadlineSelect = document.querySelector(".editDeadlineSelect");
  const editPrioritySelect = document.querySelector(".editPrioritySelect");

  saveEditBtn.addEventListener("click", () => {
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
    } else if (updatedDeadline === "") {
      updatedDeadlineImg = "";
    }

    todoList.updateTodo(
      todo.id,
      updatedContent,
      updatedDeadline,
      updatedDeadlineImg,
      updatedPriority
    );

    editModal.style.display = "none";
    paintTodo();
  });

  const cancelEditBtn = document.querySelector(".cancelEditBtn");
  cancelEditBtn.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  const delBtn = document.querySelector(".delBtn");
  delBtn.addEventListener("click", () => {
    const confirmation = confirm("정말 삭제하시겠습니까?");
    if (confirmation) {
      todoList.deleteTodo(todo.id);
      editModal.style.display = "none";
      paintTodo();
    }
  });
};

todoMenu.addEventListener("click", () => {
  if (todoClass.style.display === "none" || todoClass.style.display === "") {
    todoClass.style.display = "block";
  } else {
    todoClass.style.display = "none";
  }
});

window.addEventListener("DOMContentLoaded", loadTodosAndPaint);
