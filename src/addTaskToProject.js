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
