export default class Todo {
  constructor(
    id = Date.now(),
    content,
    deadline = "",
    deadlineImg = "",
    priority = "p4",
    isCompleted = false
  ) {
    this.id = id;
    this.content = content;
    this.deadline = deadline;
    this, (deadlineImg = deadlineImg);
    this.priority = priority;
    this.isCompleted = isCompleted;

    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.saveToLocalStorage();
  }

  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
