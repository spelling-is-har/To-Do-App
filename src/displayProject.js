import { deleteTaskFromProject, addTaskToProject } from "./taskHandling.js";

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

  //clears content container and then adds the new project
  const contentContainer = document.querySelector(".content-container");
  contentContainer.innerHTML = "";
  contentContainer.append(title, description, taskContainer);
}

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
