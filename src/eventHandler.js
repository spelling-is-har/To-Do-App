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

  console.log(newStatus);

  let updatedTask = task;
  updatedTask.isComplete = newStatus;

  let updatedProject = deleteTaskFromProject(task, project);
  addTaskToProject(updatedTask, updatedProject);
  //   saveProject(updatedProject);
}
