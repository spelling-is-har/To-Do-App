export function displayProject(project) {
  const title = document.createElement("h1");
  title.classList.add("title");
  title.innerText = project.title;

  const description = document.createElement("div");
  description.classList.add("description");
  description.innerText = project.description;

  const taskContainer = document.createElement("div");
  for (let task of project.tasks) {
    taskContainer.append(displayTask(task));
  }

  const contentContainer = document.querySelector(".content-container");
  contentContainer.append(title, description, taskContainer);
}

function displayTask(task) {
  const taskTitle = document.createElement("h3");
  taskTitle.classList.add("task-title");
  taskTitle.innerText = task.title;
  return taskTitle;
}
