let todolist = [];
let editTodoId = null;

if (localStorage.getItem("todolist")) {
  todolist = JSON.parse(localStorage.getItem("todolist"));
  displayTodos();
}

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

function getAllTodos() {
  return todolist;
}

function getTodayTodos() {
  return todolist.filter((todo) => todo.deadline === "오늘");
}

function getImportantTodos() {
  return todolist.filter((todo) => todo.priority === "p1");
}

function searchTodos() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredTodos = todolist.filter((todo) =>
    todo.text.toLowerCase().includes(searchTerm)
  );

  displaySearchResults(filteredTodos);
}

export {
  addTodo,
  saveTodos,
  deleteTodo,
  toggleComplete,
  toggleUncomplete,
  getAllTodos,
  getTodayTodos,
  getImportantTodos,
  searchTodos,
};
