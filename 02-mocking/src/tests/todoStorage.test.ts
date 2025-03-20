import { beforeEach, afterEach, describe, expect, it } from 'vitest';
import { getTodos, saveTodos } from '../utils/todoStorage';
import mockedLocalStorage from '../mocks/mockedLocalStorage';
import { Todo } from '../types/Todo';

//take out the reference to the original localStorage
let originalLocalStorage: Storage; //create a variable to store the original localStorage

const TODO: Todo = {
    id: 1,
    title: 'My first todo',
    completed: false,
};


//before each test, save a reference to the original localStorage
beforeEach(() => {
    // save a reference to the original localStorage before each test
    originalLocalStorage = globalThis.localStorage; 

    //replace localStorage with our mocked version
    globalThis.localStorage = mockedLocalStorage();
});


//after each test, restore the original localStorage
afterEach(() => {
    // restore the original localStorage after each test
    globalThis.localStorage = originalLocalStorage;
});



describe('Get todos', () => {
    it('returns empty list of todos', () => {
        const todos = getTodos(); //get todos from localStorage

        expect(todos).toHaveLength(0); //expect todos to be empty
        // if i only have this i will get "local storage is not defined" because local storage only works in an actual browser (window)
        // we have to create a "fake" local storage to make it work with mock functions (check beforeEach and afterEach)
    });


});


describe('Save todos', () => {
    it.todo('can save a todo', () => {
        // save TODO and make sure it's ok
        //i.e., test 'saveTodos'
        
    });

    it.todo('can save a todo and then retrieve it', () => {
        // save TODO and then make sure we can retrieve it
        // i.e., test 'saveTodos' and then check that the saved todo exist when invoking 'getTodos'
    });


});