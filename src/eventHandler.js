import { deleteProject, retrieveProject, saveProject } from "./localStorage.js";
import {
  deleteTaskFromProject,
  addTaskToProject,
  retrieveTaskFromProject,
} from "./taskHandling.js";
import { Task } from "./task.js";

export function updateTaskIsComplete(task, project, newStatus) {
  if (!task) throw new Error("Task is not defined");

  if (!project) throw new Error("Project is not defined");

  if (!typeof newStatus === "boolean")
    throw new Error("newStatus must be a boolean");

  //create temporary task so the old task can be deleted and the updated task can be saved
  let updatedTask = task;
  updatedTask.isComplete = newStatus;

  let updatedProject = deleteTaskFromProject(task, project);
  addTaskToProject(updatedTask, updatedProject);
}

export function updateProjectIsComplete(project, newStatus) {
  if (!project) throw new Error("Project is not defined");
  if (!typeof newStatus === "boolean")
    throw new Error("newStatus must be a boolean");

  //create temporary project so the old project can be deleted and the updated project can be saved
  let updatedProject = project;
  updatedProject.isComplete = newStatus;

  deleteProject(project.id);
  saveProject(updatedProject);
}
