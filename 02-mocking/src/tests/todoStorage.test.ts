/**
  * @vitest-environment happy-dom
  */
import { afterEach, describe, expect, it, vi } from "vitest";
import { getTodos, saveTodos } from '../utils/todoStorage';
import { Todo } from '../types/Todo';


const TODO: Todo = {
    id: 1,
    title: 'My first todo',
    completed: false,
};


// Reset the environment so tests aren't dependent on each other
afterEach(() => {
    // 🧹 Clear localStorage so we have a deterministic environment
 	globalThis.localStorage.clear();
});



describe('Get todos', () => {
    it('returns empty list of todos', () => {
        //register a spy on 'localStorage.getItem'
        const getItemSpy = vi.spyOn(globalThis.localStorage, 'getItem');

        const todos = getTodos(); //get todos from localStorage


        //make sure that 'localStorage.getItem' has been called once
        expect(getItemSpy).toHaveBeenCalledOnce();

        expect(todos).toHaveLength(0); //expect todos to be empty
        // if i only have this i will get "local storage is not defined" because local storage only works in an actual browser (window)
        // we have to create a "fake" local storage to make it work with mock functions (check beforeEach and afterEach)
    });
});


describe('Save todos', () => {
    it('can save a todo', () => {
        // save TODO and make sure it's ok
        //i.e., test 'saveTodos'
        const setItemSpy = vi.spyOn(globalThis.localStorage, 'setItem');
        const res = saveTodos([ TODO ]);

        expect(setItemSpy).toHaveBeenCalledOnce();
        expect(res.success).toBe(true);
    });

    it('can save a todo and then retrieve it', () => {
        // save TODO and then make sure we can retrieve it
        // i.e., test 'saveTodos' and then check that the saved todo exist when invoking 'getTodos'
        const res = saveTodos([ TODO ]);
        expect(res.success).toBe(true);

        const todos = getTodos();
        expect(todos).toStrictEqual([ TODO ])

        //this is more similar to an integration test because we are testing two different functions together to see if they work together
        
    });
});