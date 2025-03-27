import { http, HttpResponse, PathParams } from 'msw';
import { Todo, TodoData } from '../types/Todo';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const dummyTodos: Todo[] = [
    { id: 1, title: 'My first todo', completed: false },
    { id: 2, title: 'My second todo', completed: true },
    { id: 3, title: 'My third todo', completed: false },
];

type CreateTodoRequestBody = TodoData;
type UpdateTodoRequestBody = Partial<TodoData>;
type TodoParams = {
    todoId: string,
};

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
    http.get<TodoParams>(BASE_URL + "/todos/:todoId", ({ params }) => { // Reading path parameters in https://mswjs.io/docs/network-behavior/rest/ + https://mswjs.io/docs/best-practices/typescript
        // Get the todo ID from the request parameters
		const todoId = Number(params.todoId);

		// Check if a todo with that ID exists
		const todo = dummyTodos.find(todo => todo.id === todoId);

		// If not, respond with empty object and HTTP 404 Not Found
		if (!todo) {
			return HttpResponse.json({}, { status: 404 });
		}

		// Otherwise, respond with the todo with the corresponding ID
		return HttpResponse.json(todo);
    }),


    //mock create todo
    // POST http://localhost:3001/todos
    http.post<PathParams, CreateTodoRequestBody >(BASE_URL + '/todos', async ({ request }) => { //reading request body in https://mswjs.io/docs/network-behavior/rest/
        //get POST body
        const payload = await request.json();
        
        if(!payload.title || typeof payload.completed === 'undefined') {
            return HttpResponse.json({}, { status: 400 });
        };
        
        
        //find next available id
        const id = Math.max(0, ...dummyTodos.map(todo => todo.id) ) + 1;
        
        
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
    http.patch<TodoParams, UpdateTodoRequestBody>(BASE_URL + "/todos/:todoId", async ({ params, request }) => {
        // Get the todo ID from the request
        const todoId = Number(params.todoId);

        // Get PATCH body
        const payload = await request.json();

        // Check if a todo with that ID exists
        const todo = dummyTodos.find(todo => todo.id === todoId);

        // If not, respond with empty object and HTTP 404 Not Found
        if (!todo) {
            return HttpResponse.json({}, { status: 404 });
        }

        // Update todo with payload
        // todo.title = payload.title ? payload.title : todo.title;
        todo.title = payload.title ?? todo.title;
        todo.completed = payload.completed ?? todo.completed;

        // Respond with updated todo
        return HttpResponse.json(todo);
    }),


    //mock delete todo
    // DESTROY http://localhost:3001/todos/:todoId
    http.delete<TodoParams>(BASE_URL + "/todos/:todoId", ({ params }) => {
        // Get the todo ID from the request
        const todoId = Number(params.todoId);

        // Find index of todo with that ID
        const todoIndex = dummyTodos.findIndex(todo => todo.id === todoId);

        // If todo could not be found, respond with empty object and HTTP 404 Not Found
        if (todoIndex === -1) {
            // This is not the todo you're looking for
            return HttpResponse.json({}, { status: 404 });
        }

        // Remove todo from array
        dummyTodos.splice(todoIndex, 1);

        // Respond with empty object
        return HttpResponse.json({});
    }),
];