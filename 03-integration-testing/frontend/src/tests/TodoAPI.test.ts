import { describe, expect, it } from "vitest";
import * as TodoAPI from "../services/TodoAPI";
import { TodoData } from "../types/Todo";

const newTodo: TodoData = {
    title: 'Just a random todo in test',
    completed: false,
};

describe('TodoAPI', () => {
    it("should return a list", async () => {
        const todos = await TodoAPI.getTodos();

        expect( Array.isArray(todos) ).toBe(true);
    });

	it("should create a todo", async () => {
        const todos = await TodoAPI.createTodo(newTodo);

        console.log(todos)
        expect(todos.id).toBeTypeOf('number');
        expect(todos.title).toBe(newTodo.title);
        expect(todos.completed).toBe(newTodo.completed);

        //better alternative to the once above
        expect(todos).toMatchObject({
            id: expect.any(Number),
            title: newTodo.title,
            completed: newTodo.completed,
        });
    });

	it.todo("should create and then get the todo", () => {});

	it.todo("should create and then find the todo among all todos", () => {});

	it.todo("should create and then update the todo", () => {});

	it.todo("should create and then delete the todo", () => {});
});
