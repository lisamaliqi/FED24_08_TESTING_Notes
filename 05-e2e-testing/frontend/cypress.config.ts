import { defineConfig } from "cypress";
 
 export default defineConfig({
 	e2e: {
 		baseUrl: "http://localhost:5173",
 		excludeSpecPattern: [
 			"**/e2e/examples",
 		],
 	},
 });