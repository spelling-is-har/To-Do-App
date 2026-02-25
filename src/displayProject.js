import { deleteTaskFromProject, addTaskToProject } from "./taskHandling.js";
import { deleteProject } from "./localStorage.js";
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

// //event handler for edit project form
// const newProjectForm = document.querySelector("#new-project-form");
// newProjectForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const name = document.querySelector("#new-project-name").value;
//   const date = document.querySelector("#new-project-date").value;
//   const description = document.querySelector("#new-project-description").value;

//   const newProject = new Project(name, date, description);
//   console.log(newProject);

//   saveProject(newProject);
//   buildProjectNav();

//   document.querySelector("#new-project-name").value = "";
//   document.querySelector("#new-project-date").value = "";
//   document.querySelector("#new-project-description").value = "";

//   const dialog = document.querySelector("#new-project-dialog");
//   dialog.close();
// });
