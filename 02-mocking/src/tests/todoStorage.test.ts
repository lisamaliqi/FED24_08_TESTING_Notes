import { describe, expect, it } from 'vitest';
import { getTodos, saveTodos } from '../utils/todoStorage';

describe('Get todos', () => {
    it('returns empty list of todos', () => {
        const todos = getTodos(); //get todos from localStorage

        expect(todos).toHaveLength(0); //expect todos to be empty
        // if i only have this i will get "local storage is not defined" because local storage only works in an actual browser (window)
        // we have to create a "fake" local storage to make it work with mock functions
    });


});


describe('Save todos', () => {
    it.todo('can save a todo', () => {

    });

    it.todo('can save a todo and then retrieve it', () => {

    });


});