// src/index.js
import "./styles.css";
import { greeting } from "./greeting.js";
import { Task } from "./task.js";
import { Project } from "./project.js";
import { addTaskToProject } from "./addTaskToProject.js";
import { deleteTaskFromProject } from "./deleteTaskFromProject.js";

console.log(greeting);

let newTask = new Task("Take out the trash", "01022012", 1, "I hate this part");
let secondTask = new Task("Clear the Kitchen", "date", "2", "I love this task");
let thirdTask = new Task("Third task", "date", "3", "I love this task");

let newProject = new Project("projectTitle", "date", "notes");

newProject.tasks.push(newTask, secondTask);

localStorage.setItem("newProject", JSON.stringify(newProject));

// let storedProject = localStorage.getItem("newProject");

newProject.tasks = addTaskToProject(thirdTask, newProject);
console.log(newProject);

newProject.tasks = deleteTaskFromProject(secondTask, newProject);
console.log(newProject);
