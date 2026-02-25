import { deleteTaskFromProject, addTaskToProject } from "./taskHandling.js";
import { deleteProject, retrieveProject, saveProject } from "./localStorage.js";
import { buildProjectNav } from "./projectSidebar.js";

//function that builds all the elements the make up the display of a project
export function displayProject(project) {
  const title = document.createElement("h1");
  title.classList.add("title");
  title.innerText = project.title;

  const description = document.createElement("div");
  description.classList.add("description");
  description.innerText = project.description;

  const taskContainer = document.createElement("div");
  //iterate over all the tasks in a project and create a DOM element for each
  for (let task of project.tasks) {
    taskContainer.append(displayTask(task, project));
  }

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.dataset.id = project.id;
  editButton.addEventListener("click", (event) => {
    const editProjecTDialog = document.querySelector("#edit-project-dialog");
    editProjecTDialog.dataset.id = project.id;
    editProjecTDialog.showModal();

    document.querySelector("#edit-project-name").value = project.title;
    document.querySelector("#edit-project-date").value = project.dueDate;
    document.querySelector("#edit-project-description").value =
      project.description;
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.dataset.id = project.id;
  deleteButton.addEventListener("click", (event) => {
    deleteProject(project.id);
    buildProjectNav();
    const projectContainer = document.querySelector(".project-container");
    projectContainer.innerHTML = "";
  });

  const projectContainer = document.querySelector(".project-container");
  projectContainer.innerHTML = "";
  projectContainer.append(
    title,
    description,
    taskContainer,
    editButton,
    deleteButton,
  );
}

//function to build all the elements that make up the display of a task
function displayTask(task, project) {
  const taskTitle = document.createElement("summary");
  taskTitle.classList.add("task-title");
  taskTitle.innerText = task.title;

  const taskNotes = document.createElement("p");
  taskNotes.innerText = task.notes;

  //creates button that deletes that task from the project
  const deleteTask = document.createElement("button");
  deleteTask.classList.add("delete-task");
  deleteTask.innerText = "Delete Task";
  deleteTask.addEventListener("click", (event) => {
    const updatedProject = deleteTaskFromProject(task, project);
    displayProject(updatedProject);
  });

  const taskInformation = document.createElement("details");
  taskInformation.append(taskTitle, taskNotes, deleteTask);

  return taskInformation;
}

//event handler for edit project form
const editProjectForm = document.querySelector("#edit-project-form");
editProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //gets the project ID and then clears it for the next use of the form
  const projectId = document.querySelector("#edit-project-dialog").dataset.id;
  document.querySelector("#edit-project-dialog").dataset.id = "";

  const project = retrieveProject(projectId);

  project.title = document.querySelector("#edit-project-name").value;
  project.date = document.querySelector("#edit-project-date").value;
  project.description = document.querySelector(
    "#edit-project-description",
  ).value;

  //deletes the old project and then saves the copy of the new one
  deleteProject(projectId);
  saveProject(project);
  buildProjectNav();

  //clears the form for the next time it is open
  document.querySelector("#edit-project-name").value = "";
  document.querySelector("#edit-project-date").value = "";
  document.querySelector("#edit-project-description").value = "";

  const dialog = document.querySelector("#edit-project-dialog");
  dialog.close();
});
