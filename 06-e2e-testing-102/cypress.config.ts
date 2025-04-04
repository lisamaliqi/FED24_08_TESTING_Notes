import { defineConfig } from "cypress";

 export default defineConfig({
 	e2e: {
 		baseUrl: "https://fed23-firebase-todos.netlify.app",
 		excludeSpecPattern: [
 			"**/e2e/examples",
 		],
 	},
 });
