import { deleteProject, saveProject } from "./localStorage.js";

export function addTaskToProject(task, project) {
  if (!task) {
    throw new Error("Task not defined");
  }

  if (!project) {
    throw new Error("Project not defined");
  }

  //check to ensure that the task is not already a part of this project
  const found = project.tasks.find(({ id }) => id === task.id);
  if (found) throw new Error("This task is already in the project");

  //temporary array for the return value
  let updatedTask = project.tasks;
  updatedTask.push(task);
  return updatedTask;
}

export function deleteTaskFromProject(task, project) {
  if (!task) {
    throw new Error("Task not defined");
  }

  if (!project) {
    throw new Error("Project not defined");
  }

  //creates a temporary copy of the project with the updated tasks list, deletes the old
  //project and saves the new one.
  let tempProject = project;

  //only returns the items that do not equal the task id
  tempProject.tasks = project.tasks.filter((item) => item.id != task.id);

  deleteProject(project.id);
  saveProject(tempProject);

  //returns the updated project
  return tempProject;
}
