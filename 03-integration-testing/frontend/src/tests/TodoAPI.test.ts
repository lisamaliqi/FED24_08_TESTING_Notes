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

        // console.log(todos)
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


    //Workshop!!
	it("should create and then get the todo", async () => {
        const todos = await TodoAPI.createTodo(newTodo);
        const get = await TodoAPI.getTodo(todos.id);

        // console.log('todos: ', todos);
        // console.log('get: ', get);
        expect(todos).toMatchObject({
            id: expect.any(Number),
            title: newTodo.title,
            completed: newTodo.completed,
        });
        expect(get).toMatchObject({
            id: todos.id,
            title: todos.title,
            completed: todos.completed,
        });
    });

	it("should create and then find the todo among all todos", async () => {
        const todo = await TodoAPI.createTodo(newTodo);
        const getAll = await TodoAPI.getTodos();

        // console.log('todos: ', todo);
        // console.log('GetAll: ', getAll);

        expect(todo).toMatchObject({
            id: expect.any(Number),
            title: newTodo.title,
            completed: newTodo.completed,
        });
        expect(getAll).toContainEqual(todo);
    });

	it("should create and then update the todo", async () => {
        const todo = await TodoAPI.createTodo(newTodo);
        const update = await TodoAPI.updateTodo(todo.id, todo);

        // console.log('todos: ', todo);
        // console.log('update: ', update);
        expect(todo).toMatchObject({
            id: expect.any(Number),
            title: newTodo.title,
            completed: newTodo.completed,
        });
        expect(update).toMatchObject({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
        });
    });

	it("should create and then delete the todo", async () => {
        const todo = await TodoAPI.createTodo(newTodo);
        const deleteTodo = await TodoAPI.deleteTodo(todo.id);

        console.log('todos: ', todo);
        console.log('deleteTodo: ', deleteTodo);
        expect(todo).toMatchObject({
            id: expect.any(Number),
            title: newTodo.title,
            completed: newTodo.completed,
        });
        expect(deleteTodo).toMatchObject({});

    });
});
