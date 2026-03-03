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

//creates a copy of the original project, updates the new project and then saves the new project
export function editTask(task, updatedTask, project) {
  const updatedProject = deleteTaskFromProject(task, project);
  addTaskToProject(updatedTask, updatedProject);
  deleteProject(project.id);
  saveProject(updatedProject);
  return updatedProject;
}

export function editProject(originalProjectId, updatedProject) {
  //deletes the old project and then saves the copy of the new one
  deleteProject(originalProjectId);
  saveProject(updatedProject);
}
