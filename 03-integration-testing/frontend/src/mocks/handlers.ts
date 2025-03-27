import { http, HttpResponse, PathParams } from 'msw';
import { Todo, TodoData } from '../types/Todo';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const dummyTodos: Todo[] = [
    { id: 1, title: 'My first todo', completed: false },
    { id: 2, title: 'My second todo', completed: true },
    { id: 3, title: 'My third todo', completed: false },
];

type CreateTodoRequestBody = TodoData;

//array containing all our request handlers
export const handlers = [
    //Mock get all todos
    // GET http://localhost:3001/todos
    http.get(BASE_URL + '/todos', () => {
        console.log('👮🏻intercepted GET /todos');
        return HttpResponse.json(dummyTodos);
    }),

    //mock get single todo
    // GET http://localhost:3001/todos/:todoId


    //mock create todo
    // POST http://localhost:3001/todos
    http.post<PathParams, CreateTodoRequestBody >(BASE_URL + '/todos', async ({ request }) => { //reading request body in https://mswjs.io/docs/network-behavior/rest/
        //get POST body
        const payload = await request.json();
        
        if(!payload.title || typeof payload.completed === 'undefined') {
            return HttpResponse.json({}, { status: 400 });
        };
        
        
        //find next available id
        const id = dummyTodos.reduce((maxId, todo) => {
            return todo.id < maxId
            ? todo.id
            : maxId;
        }, 0) +1;
        
        
        //create todo object
        const todo: Todo = {
            id,
            ...payload,
        };
        

        //add the ew todo to our list of todos
        dummyTodos.push(todo);
        
        
        //respond with the created todo
        console.log('👮‍♀️intercepted POST /todos');
        return HttpResponse.json(todo);
    }),

    //mock update todo
    // PATCH http://localhost:3001/todos/:todoId

    //mock delete todo
    // DESTROY http://localhost:3001/todos/:todoId
];