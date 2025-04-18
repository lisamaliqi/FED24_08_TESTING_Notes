import { addTodo, deleteTodo, getTodos, toggleTodo } from "./functions";
import { showError, hideError } from "./utils/error";
import { renderTodos } from "./utils/render";
import "./assets/scss/main.scss";

const todosEl = document.querySelector<HTMLUListElement>("#todos")!;
const newTodoFormEl =
	document.querySelector<HTMLFormElement>("#new-todo-form")!;

// listen for click-events on the todo list
todosEl.addEventListener("click", async (e: MouseEvent) => {
	const target = e.target as HTMLElement;

	if (target.classList.contains("todo-title")) {
		// toggle todo if click was on the todo-title element
		const todoId = Number(target.parentElement!.dataset.todoId);
		const result = await toggleTodo(todoId);

		// if toggle wasn't successful, show error
		if (!result.success) {
			showError(result.error!);
			return;
		}

		// hide error
		hideError();

		// get and re-render todos
		getAndRenderTodos();

	} else if (target.classList.contains("delete-todo")) {
		// delete todo if click was on the trashcan
		e.stopPropagation();

		const todoId = Number(target.parentElement!.dataset.todoId);
		const result = await deleteTodo(todoId);

		// if delete wasn't successful, show error
		if (!result.success) {
			showError(result.error!);
			return;
		}

		// hide error
		hideError();

		// get and re-render todos
		getAndRenderTodos();
	}
});

// create a new todo form
newTodoFormEl.addEventListener("submit", async (e: SubmitEvent) => {
	e.preventDefault();

	const newTodoTitle =
		document.querySelector<HTMLInputElement>("#new-todo-title")!.value;

	const result = await addTodo(newTodoTitle);

	if (!result.success) {
		showError(result.error!);
		return;
	}

	hideError();

	// empty input
	document.querySelector<HTMLInputElement>("#new-todo-title")!.value = "";

	// get and re-render todos
	getAndRenderTodos();
});

// hide error on reset
newTodoFormEl.addEventListener("reset", () => {
	hideError();
});

// get todos from api and render them
export const getAndRenderTodos = async () => {
	// get todos
	const result = await getTodos();

	// check if successful
	if (!result.success) {
		// render error
		showError(result.error);
		return;
	}

	// render todos
	renderTodos(result.data);
};

// get and render todos
getAndRenderTodos();
