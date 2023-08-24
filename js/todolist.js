export class Todo {
  constructor(id, content, deadline, deadlineImg, priority, isCompleted) {
    this.id = id;
    this.content = content;
    this.deadline = deadline;
    this.deadlineImg = deadlineImg;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }

  addTodo() {
    const todoText = addInput.value;
    if (todoText === "") return;

    const setId = Date.now();

    const newTodo = {
      id: setId,
      content: todoText,
      deadline: "",
      deadlineImg: "",
      priority: "p4",
      isCompleted: false,
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

  saveTodos() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }

  deleteTodo() {
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

  toggleComplete(todoId) {
    const todoIndex = todolist.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      todolist[todoIndex].completed = true;
      saveTodos();
      displayTodos();
    }
  }

  toggleUncomplete(todoId) {
    const todoIndex = todolist.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      todolist[todoIndex].completed = false;
      saveTodos();
      displayTodos();
    }
  }
}
