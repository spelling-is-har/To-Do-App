import { displayProject } from "./displayProject.js";
import { retrieveProject } from "./localStorage.js";

export function buildProjectNav() {
  const projectKeys = Object.keys(localStorage);

  const projectNav = document.querySelector(".projects-nav");
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
