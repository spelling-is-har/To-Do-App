import {
  deleteTaskFromProject,
  addTaskToProject,
  retrieveTaskFromProject,
} from "./taskHandling.js";
import { deleteProject, retrieveProject, saveProject } from "./localStorage.js";
import { buildProjectNav } from "./projectSidebar.js";
import { Task } from "./task.js";
import { updateTaskIsComplete } from "./eventHandler.js";

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

  //creates a button that creates a new task
  const addTask = document.createElement("button");
  addTask.classList.add("add-task");
  addTask.innerText = "Add Task";
  addTask.addEventListener("click", (event) => {
    document.querySelector("#add-task-dialog").dataset.id = project.id;
    document.querySelector("#add-task-dialog").showModal();
  });

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.dataset.id = project.id;
  editButton.addEventListener("click", (event) => {
    const editProjectDialog = document.querySelector("#edit-project-dialog");
    editProjectDialog.dataset.id = project.id;
    editProjectDialog.showModal();

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
    addTask,
    editButton,
    deleteButton,
  );
}

//function to build all the elements that make up the display of a task
function displayTask(task, project) {
  const taskTitle = document.createElement("summary");
  taskTitle.classList.add("task-title");
  taskTitle.innerText = task.title;

  //creates a checkbox to keep track of whether the task is complete
  const taskComplete = document.createElement("input");
  taskComplete.type = "checkbox";
  taskComplete.classList.add("task-complete");
  if (task.isComplete) taskComplete.checked = true;
  taskComplete.addEventListener("change", (event) => {
    event.preventDefault();
    // console.log(taskComplete.checked);
    updateTaskIsComplete(task, project, taskComplete.checked);
  });

  const taskNotes = document.createElement("p");
  taskNotes.innerText = task.notes;

  //creates button that deletes task from the project
  const editTaskButton = document.createElement("button");
  editTaskButton.classList.add("edit-task-button");
  editTaskButton.innerText = "Edit Task";
  editTaskButton.addEventListener("click", (event) => {
    //sets the dialog dataset ID to project and task ID's so they can be used for
    //loading the data of the task in to the form for editing
    const editTaskDialog = document.querySelector("#edit-task-dialog");
    editTaskDialog.dataset.taskId = task.id;
    editTaskDialog.dataset.projectId = project.id;

    //sets the values of the form to the current task values
    document.querySelector("#edit-task-name").value = task.title;
    document.querySelector("#edit-task-date").value = task.dueDate;
    document.querySelector("#edit-task-description").value = task.notes;
    document.querySelector("#edit-task-priority").value = task.priority;
    editTaskDialog.showModal();
  });

  //creates button that deletes that task from the project
  const deleteTask = document.createElement("button");
  deleteTask.classList.add("delete-task");
  deleteTask.innerText = "Delete Task";
  deleteTask.addEventListener("click", (event) => {
    const updatedProject = deleteTaskFromProject(task, project);
    displayProject(updatedProject);
  });

  const taskInformation = document.createElement("details");
  taskInformation.append(
    taskTitle,
    taskComplete,
    taskNotes,
    editTaskButton,
    deleteTask,
  );

  return taskInformation;
}

//event handler for add task form
const addTaskForm = document.querySelector("#add-task-form");
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("#add-task-name").value;
  const date = document.querySelector("#add-task-date").value;
  const priority = document.querySelector("#add-task-priority").value;
  const description = document.querySelector("#add-task-description").value;

  //creates a new task from the data in the form
  const newTask = new Task(name, date, priority, description);

  //gets the project ID from the dataset on the modal form, then clears it for the next use
  const projectId = document.querySelector("#add-task-dialog").dataset.id;
  document.querySelector("#add-task-dialog").dataset.id = "";

  //retrieves the project, updates it with the new task, saves it and then displays it to the user
  let project = retrieveProject(projectId);
  addTaskToProject(newTask, project);
  saveProject(project);
  displayProject(project);

  //clears the form for the next time a task needs to be added
  document.querySelector("#add-task-name").value = "";
  document.querySelector("#add-task-date").value = "";
  document.querySelector("#add-task-priority").value = "Low";
  document.querySelector("#add-task-description").value = "";

  //closes the modal
  document.querySelector("#add-task-dialog").close();

  buildProjectNav();
});

//event handler for edit task form
const editTaskForm = document.querySelector("#edit-task-form");
editTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //use the edit-task-dialog dataset to retrieve the task and project
  const dialog = document.querySelector("#edit-task-dialog");
  const task = retrieveTaskFromProject(
    dialog.dataset.taskId,
    dialog.dataset.projectId,
  );

  const project = retrieveProject(dialog.dataset.projectId);

  //clear the datasets for the next use of the form
  dialog.dataset.projectId = "";
  dialog.dataset.taskId = "";

  let updatedTask = task;

  updatedTask.title = document.querySelector("#edit-task-name").value;
  updatedTask.dueDate = document.querySelector("#edit-task-date").value;
  updatedTask.notes = document.querySelector("#edit-task-description").value;
  updatedTask.priority = document.querySelector("#edit-task-priority").value;

  const updatedProject = deleteTaskFromProject(task, project);
  addTaskToProject(updatedTask, updatedProject);
  deleteProject(project.id);
  saveProject(updatedProject);
  buildProjectNav();
  displayProject(updatedProject);

  document.querySelector("#edit-task-name").value = "";
  document.querySelector("#edit-task-date").value = "";
  document.querySelector("#edit-task-description").value = "";
  document.querySelector("#edit-task-priority").value = "";

  dialog.close();
});

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
  displayProject(project);

  //clears the form for the next time it is open
  document.querySelector("#edit-project-name").value = "";
  document.querySelector("#edit-project-date").value = "";
  document.querySelector("#edit-project-description").value = "";

  const dialog = document.querySelector("#edit-project-dialog");
  dialog.close();
});
