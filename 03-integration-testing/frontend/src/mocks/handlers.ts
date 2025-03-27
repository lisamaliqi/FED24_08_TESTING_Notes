import { http, HttpResponse } from 'msw';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//array containing all our request handlers
export const handlers = [
    //Mock get all todos
    // GET http://localhost:3001/todos
    http.get(BASE_URL + '/todos', () => {
        console.log('intercepted GET /todos');
        return HttpResponse.json([]);
    }),

    //mock get single todo
    // GET http://localhost:3001/todos/:todoId

    //mock create todo
    // POST http://localhost:3001/todos

    //mock update todo
    // PATCH http://localhost:3001/todos/:todoId

    //mock delete todo
    // DESTROY http://localhost:3001/todos/:todoId
];