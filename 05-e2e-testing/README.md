# E2E testing
 
 This is just a copy of `03-integration-testing` so we have both the E2E-tests and the actual app that's being testing in the same base directory.
 
 ## Installation
 
 ### Backend
 
 ```zsh
 cd backend
 npm install
 npm run server
 ```
 
 ### Frontend
 
 ```zsh
 cd frontend
 npm install
 cp .env.example .env
 npm run dev
 ```
 
 ### Cypress
 
 ```zsh
 cd frontend
 npm install cypres --save-dev
 npx cypress open
 ```