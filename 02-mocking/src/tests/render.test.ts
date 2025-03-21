/**
  * @vitest-environment happy-dom
  */
import { describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";
import testTodos from "./data/todos";
 
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
    it.todo("should output list with many todo", () => {});


    it.todo("should output list with one completed todo", () => {});


    it.todo("should output list with one todo that isn't completed", () => {});
 
});