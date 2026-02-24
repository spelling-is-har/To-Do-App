// src/index.js
import "./styles.css";
import { Task } from "./task.js";
import { Project } from "./project.js";
import { addTaskToProject, deleteTaskFromProject } from "./taskHandling.js";
import { saveProject, deleteProject, retrieveProject } from "./localStorage.js";
import { displayProject } from "./displayProject.js";
import { buildProjectNav } from "./projectSidebar.js";

localStorage.clear();

let newTask = new Task("Take out the trash", "01022012", 1, "I hate this part");
let secondTask = new Task("Clear the Kitchen", "date", "2", "I love this task");
let thirdTask = new Task("Third task", "date", "3", "I love this task");

let newProject = new Project("project 1", "date", "notes");
let newProject2 = new Project("project 2", "date", "notes");
let newProject3 = new Project("project 3", "date", "notes");

newProject.tasks.push(newTask, secondTask);

newProject.tasks = addTaskToProject(thirdTask, newProject);

// console.log(newProject);

// newProject.tasks = deleteTaskFromProject(secondTask, newProject);
// console.log(newProject);

saveProject(newProject);
saveProject(newProject2);
saveProject(newProject3);

// displayProject(newProject);

buildProjectNav();
// let saved = retrieveProject(newProject.id);

// console.log(saved);

// deleteProject("newProject");

// console.log(saved);

// let retrievedProject = retrieveProject("00d5cc89-0ae3-41af-bb41-956254276a70");
// console.log(retrievedProject);

//button for adding a new project
const newProjectButton = document.querySelector(".new-project-button");
newProjectButton.addEventListener("click", (event) => {
  console.log("click");
  const newProjectForm = document.querySelector("#new-project-form");
  newProjectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#new-project-name").value;
    const date = document.querySelector("#new-project-date").value;
    const description = document.querySelector(
      "#new-project-description",
    ).value;

    const newProject = new Project(name, date, description);
    console.log(newProject);

    saveProject(newProject);
    buildProjectNav();

    document.querySelector("#new-project-name").value = "";
    document.querySelector("#new-project-date").value = "";
    document.querySelector("#new-project-description").value = "";

    const dialog = document.querySelector("#new-project-dialog");
    dialog.close();
  });
});
