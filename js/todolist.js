class Todo {
  constructor(id, content, deadline, deadlineImg, priority, isCompleted) {
    this.id = id;
    this.content = content;
    this.deadline = deadline;
    this.deadlineImg = deadlineImg;
    this.priority = priority;
    this.isCompleted = isCompleted;
  }
}

class TodoList {
  constructor() {
    this.todolist = [];
    this.loadTodos();
  }

  loadTodos() {
    const savedTodos = localStorage.getItem("todolist");
    if (savedTodos) {
      this.todolist = JSON.parse(savedTodos);
    } else {
      this.todolist = [];
    }
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

    this.todolist.push(newTodo);
    this.saveTodos();

    addInput.value = "";
  }

  saveTodos() {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }

  toggleComplete(todoId) {
    const todoIndex = todolist.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      this.todolist[todoIndex].isCompleted = true;
      saveTodos();
    }
  }

  toggleUncomplete(todoId) {
    const todoIndex = todolist.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      this.todolist[todoIndex].isCompleted = false;
      saveTodos();
    }
  }
}

export { Todo, TodoList };
