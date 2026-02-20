export function deleteTaskFromProject(task, project) {
  if (!task) {
    throw new Error("Task not defined");
  }

  if (!project) {
    throw new Error("Project not defined");
  }

  //only returns the items that do not equal the task id
  const returnArray = project.tasks.filter((item) => item.id != task.id);
  return returnArray;
}
