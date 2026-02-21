// src/index.js
import "./styles.css";
import { Task } from "./task.js";
import { Project } from "./project.js";
import { addTaskToProject } from "./addTaskToProject.js";
import { deleteTaskFromProject } from "./deleteTaskFromProject.js";
import { saveProject, deleteProject, retrieveProject } from "./localStorage.js";

//clear local storage for now
// localStorage.clear();

let newTask = new Task("Take out the trash", "01022012", 1, "I hate this part");
let secondTask = new Task("Clear the Kitchen", "date", "2", "I love this task");
let thirdTask = new Task("Third task", "date", "3", "I love this task");

let newProject = new Project("projectTitle", "date", "notes");

newProject.tasks.push(newTask, secondTask);

newProject.tasks = addTaskToProject(thirdTask, newProject);
console.log(newProject);

// newProject.tasks = deleteTaskFromProject(secondTask, newProject);
// console.log(newProject);

// saveProject(newProject);
// let saved = retrieveProject(newProject);

// console.log(saved);

deleteProject("e4f89026-78a3-4ddb-a653-8ef9942180ca");

// console.log(saved);
