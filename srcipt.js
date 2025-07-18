const input = document.querySelector("[data-input-todo]");
const container = document.querySelector("[data-todos-container]");

let todoList = JSON.parse(localStorage.getItem("todos")) || [];

renderTodo();

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && input.value.trim()) {
    const text = input.value.trim();

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    todoList.push(todo);
    saveTodos();

    renderTodo();
    input.value = "";
  }
});

function removeTodo(id) {
  const index = todoList.findIndex((todo) => todo.id === id);
  if (index !== 1) {
    todoList.splice(index, 1);
    saveTodos();
    renderTodo();
  }
}

function renderTodo() {
  container.innerHTML = "";

  todoList.forEach((todo) => {
    const div = document.createElement("div");
    div.textContent = todo.text;
    div.classList.add("todo-item");

    if (todo.completed) {
      div.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = todo.text;

    div.addEventListener("click", function () {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodo();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";

    removeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      removeTodo(todo.id);
    });

    removeBtn.disabled = !todo.completed;

    div.appendChild(removeBtn);
    container.appendChild(div);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todoList));
}
