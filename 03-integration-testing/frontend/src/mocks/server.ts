import { setupServer} from 'msw/node';
import { handlers } from './handlers';

//configure a request mocking server with our handlers
export const server = setupServer(...handlers);//each handler will be a seperate handler in the server when doing spread