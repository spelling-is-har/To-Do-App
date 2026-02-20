export function addTaskToProject(task, project) {
  if (!task) {
    throw new Error("Task not defined");
  }

  if (!project) {
    throw new Error("Project not defined");
  }
  //temporary array for the return value
  let updatedTask = project.tasks;
  updatedTask.push(task);
  return updatedTask;
}
