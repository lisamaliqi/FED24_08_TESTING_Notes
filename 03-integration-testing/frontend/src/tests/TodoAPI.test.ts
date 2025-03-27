import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { server } from "../mocks/server";
import * as TodoAPI from "../services/TodoAPI";
import { TodoData } from "../types/Todo";

// 👂🏻 Before all tests, start listening for requests
beforeAll(() => {
	server.listen();
});

// 🧨 Reset handlers
afterEach(() => {
	server.resetHandlers();
});

// 🙉 After all tests, stop listening
afterAll(() => {
	server.close();
});

const newTodo: TodoData = {
	title: "Test todo",
	completed: false,
};

/* 
//clean databaseTodos before all tests
const deleteAllTodos = async () => {
    //get all todos
    const todos = await TodoAPI.getTodos();

    //delete them one by one 😈
    //alright way:
    // for (let i = 0; i < todos.length; i++) {
    //     await TodoAPI.deleteTodo(todos[i].id);
    // };

    //better way:
    for(const todo of todos) {
        await TodoAPI.deleteTodo(todo.id);
    };
};

//clean up before each test so we have a predictable environment
beforeEach(deleteAllTodos);

//tidy up after ourselves
afterAll(deleteAllTodos); */

describe('TodoAPI', () => {
    it("should return a list", async () => {
        const todos = await TodoAPI.getTodos();

        expect( Array.isArray(todos) ).toBe(true);
    });

	it("should create a todo", async () => {
        const todos = await TodoAPI.createTodo(newTodo);

        // console.log(todos)
        // expect(todos.id).toBeTypeOf('number');
        // expect(todos.title).toBe(newTodo.title);
        // expect(todos.completed).toBe(newTodo.completed);

        //better alternative to the once above
        expect(todos).toMatchObject({
            id: expect.any(Number),
            title: newTodo.title,
            completed: newTodo.completed,
        });
    });


    //Workshop!!
	it("should create and then get the todo", async () => {
        // const todos = await TodoAPI.createTodo(newTodo);
        // const get = await TodoAPI.getTodo(todos.id);

        // create a new todo
		const createdTodo = await TodoAPI.createTodo(newTodo);

		// try to get the new todo
		const todo = await TodoAPI.getTodo(createdTodo.id);

        // console.log('todos: ', todos);
        // console.log('get: ', get);
        /* expect(get).toMatchObject({
            id: todos.id,
            title: todos.title,
            completed: todos.completed,
        }); */
        //this also works (maybe even better):
        // expect(get).toStrictEqual(todos);
		expect(todo).toStrictEqual(createdTodo);

    });

	it("should create and then find the todo among all todos", async () => {
        const todo = await TodoAPI.createTodo(newTodo);
        const getAll = await TodoAPI.getTodos();

        // console.log('todos: ', todo);
        // console.log('GetAll: ', getAll);

        expect(getAll).toContainEqual(todo);
    });

	it("should create and then update the todo", async () => {
        const todo = await TodoAPI.createTodo(newTodo);
        const update = await TodoAPI.updateTodo(todo.id, {
            completed: !todo.completed, //reverse so i update false to true or true to false
        });

        // console.log('todos: ', todo);
        // // console.log('update: ', update);
        // expect(update).toMatchObject({
        //     id: todo.id,
        //     title: todo.title,
        //     completed: todo.completed,
        // });

        expect(update).toStrictEqual({
            ...todo,
            completed: !todo.completed,
        });
    });

	it.skip("should create and then delete the todo", async () => {
        const todo = await TodoAPI.createTodo(newTodo);
        await TodoAPI.deleteTodo(todo.id);
        const todos = await TodoAPI.getTodos();

        // console.log('todos: ', todo);
        // console.log('deleteTodo: ', deleteTodo);
        expect(todos).not.toContainEqual(todo);
    });
});
