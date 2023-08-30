export default class TodoList {
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

  addTodo(content, deadline, deadlineImg, priority) {
    const setId = Date.now();

    const newTodo = {
      id: setId,
      content: content,
      deadline: deadline,
      deadlineImg: deadlineImg,
      priority: priority,
      isCompleted: false,
    };

    this.todolist.push(newTodo);
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem("todolist", JSON.stringify(this.todolist));
  }

  toggleCompletion(todoId) {
    const todo = this.todolist.find((item) => item.id === todoId);
    if (todo) {
      todo.isCompleted = !todo.isCompleted;
      this.saveTodos();
    }
  }

  updateTodo(id, content, deadline, deadlineImg, priority) {
    const todoUpdate = this.todolist.find((todo) => todo.id === id);
    if (todoUpdate) {
      todoUpdate.content = content;
      todoUpdate.deadline = deadline;
      todoUpdate.deadlineImg = deadlineImg;
      todoUpdate.priority = priority;
      this.saveTodos();
    }
  }

  deleteTodo(id) {
    this.todolist = this.todolist.filter((todo) => todo.id !== id);
    this.saveTodos();
  }

  searchTodos(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return this.todolist.filter((todo) => {
      return todo.content.toLowerCase().includes(searchTerm);
    });
  }

  getAllTodos() {
    return this.todolist;
  }

  getTodayTodos() {
    return this.todolist.filter((todo) => todo.deadline === "오늘");
  }

  getImportantTodos() {
    return this.todolist.filter((todo) => todo.priority === "p1");
  }

  getNowTodosCount() {
    return this.todolist.filter((todo) => !todo.isCompleted).length;
  }

  getTodayTodosCount() {
    return this.todolist.filter((todo) => todo.deadline === "오늘").length;
  }

  getImportantTodosCount() {
    return this.todolist.filter((todo) => todo.priority === "p1").length;
  }

  getCompletedTodosCount() {
    return this.todolist.filter((todo) => todo.isCompleted).length;
  }
}
