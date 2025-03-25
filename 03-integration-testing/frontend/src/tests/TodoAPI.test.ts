import { describe, expect, it } from "vitest";
import * as TodoAPI from "../services/TodoAPI";



describe('TodoAPI', () => {
    it("should return a list", async () => {
        const todos = await TodoAPI.getTodos();

        expect(todos).toHaveLength(4);//starting with 4 todos in db.json (backend/data)
        expect( Array.isArray(todos) ).toBe(true);
    });

	it.todo("should create a todo", () => {});

	it.todo("should create and then get the todo", () => {});

	it.todo("should create and then find the todo among all todos", () => {});

	it.todo("should create and then update the todo", () => {});

	it.todo("should create and then delete the todo", () => {});
});
