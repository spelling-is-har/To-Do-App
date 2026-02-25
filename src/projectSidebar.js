import { displayProject } from "./displayProject.js";
import { retrieveProject, saveProject } from "./localStorage.js";
import { Project } from "./project.js";

export function buildProjectNav() {
  const projectKeys = Object.keys(localStorage);

  const projectNav = document.querySelector(".projects-nav");
  projectNav.innerHTML = "";
  for (let projectKey of projectKeys) {
    const project = retrieveProject(projectKey);

    const projectButton = document.createElement("button");
    projectButton.classList.add("project-button");
    projectButton.innerText = project.title;
    projectButton.addEventListener("click", (event) => {
      event.preventDefault();
      displayProject(project);
    });

    projectNav.append(projectButton);
  }
}

//button for adding a new project
const newProjectButton = document.querySelector(".new-project-button");
newProjectButton.addEventListener("click", (event) => {
  console.log("click");
});

const newProjectForm = document.querySelector("#new-project-form");
newProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#new-project-name").value;
  const date = document.querySelector("#new-project-date").value;
  const description = document.querySelector("#new-project-description").value;

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
