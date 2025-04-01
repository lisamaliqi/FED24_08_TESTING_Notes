/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * THIS IS NOT IN USE AND ONLY FOR DEMONSTRATING
 * THE DIFFERENCE BETWEEN fetch AND axios
 */
import axios from "axios";
import { Todo, TodoData } from "../types/Todo";

const get = async <T>(url: string) => {
	const res = await axios.get<T>(url);
	return res.data;
}

export const getTodosTest = () => {
	return get<Todo[]>("http://localhost:3001/todos");
}

const post = async <ResponseType, PayloadType>(url: string, payload: PayloadType) => {
	const res = await axios.post<ResponseType>(url, payload);
	return res.data;
}

export const postTodoTest = (todo: TodoData) => {
	return post<Todo, TodoData>("http://localhost:3001/todos", todo);
}

const fetchGet = async <T>(url: string) => {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error("I'm not 🆗");
	}

	const data = await res.json() as T;

	return data;
}

export const fetchGetTodosTest = () => {
	return fetchGet<Todo[]>("http://localhost:3001/todos");
}

const fetchPost = async <ResponseType, PayloadType>(url: string, payload: PayloadType) => {
	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify(payload),
	});

	if (!res.ok) {
		throw new Error("I'm absolutely not 🆗");
	}

	const data = await res.json() as ResponseType;

	return data;
}

export const fetchPostTodoTest = (todo: TodoData) => {
	return fetchPost<Todo, TodoData>("http://localhost:3001/todos", todo);
}
