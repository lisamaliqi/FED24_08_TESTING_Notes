/**
  * @vitest-environment happy-dom
  */
import { describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";
import testTodos from "./data/todos";

// find the first finished todos
const finishedTodo = testTodos.find(todo => todo.completed) ?? {
    ...testTodos[0],
    completed: true,
};

// find the first unfinished todos
const unfinishedTodo = testTodos.find(todo => !todo.completed) ?? {
    ...testTodos[0],
    completed: false,
};

 
describe("renders todos", () => {
 
    it("should output empty list when no todos exist", () => {
 		const lis = transformTodosToHtml([]);
 		expect(lis).toBe("");
 	});
 

 	it("should output list with one todo", () => {
        const rawHTML = transformTodosToHtml([ testTodos[0] ]); //take the first todo from the todos file in data folder
        document.body.innerHTML = `<ul>${rawHTML}</ul>`; //put it in a ul element

        // query for any listitems with the `todo` class
        const liEls = document.querySelectorAll("li.todo");
        expect(liEls).toHaveLength(1);
    });


    //workshop!!
    it("should output list with many todos", () => {
        const rawHTML = transformTodosToHtml(testTodos);
        document.body.innerHTML = `<ul>${rawHTML}</ul>`;

        const liEls = document.querySelectorAll("li.todo");
        expect(liEls).toHaveLength(testTodos.length);
    });


    it("should output list with one completed todo", () => {
        const rawHTML = transformTodosToHtml([ finishedTodo ]);
        document.body.innerHTML = `<ul>${rawHTML}</ul>`;

        // query for a listitem with the `todo` and the `completed` class
 		const liEls = document.querySelectorAll("li.todo.completed");
 		expect(liEls).toHaveLength(1);
 	});


     it("should output list with one todo that isn't completed", () => {
        const rawHTML = transformTodosToHtml([ unfinishedTodo ]);
        document.body.innerHTML = `<ul>${rawHTML}</ul>`;

        // query for a listitem with the `todo` class and NOT the `completed` class
        const liEls = document.querySelectorAll("li.todo:not(.completed)");
        expect(liEls).toHaveLength(1);
    });
 
});