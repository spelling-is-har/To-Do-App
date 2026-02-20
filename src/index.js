// src/index.js
import "./styles.css";
import { greeting } from "./greeting.js";
import { Task } from "./task.js";
import { Project } from "./project.js";

console.log(greeting);

let newTask = new Task("Take out the trash", "01022012", 1, "I hate this part");

localStorage.setItem("newTask", JSON.stringify(newTask));

let storedTask = localStorage.getItem("newTask");

console.log(JSON.parse(storedTask));

let newProject = new Project("projectTitle", "date", "notes");

newProject.tasks.push(newTask.id);

console.log(newProject);
