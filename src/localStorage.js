export function saveProject(project) {
  //check to see if there is a project to be saved
  if (!project) throw new Error("No Project to save");

  console.log(project);

  //stringifys project for storage
  localStorage.setItem(project.id, JSON.stringify(project));
}

export function deleteProject(project) {
  //check to see if a project has been provided for deletion
  if (!project) throw new Error("No Project to save");

  //check to see the project exists in local storage
  const storedProject = localStorage.getItem(project.id);
  if (!storedProject) throw new Error("Project does not exist");

  console.log(project);

  localStorage.removeItem(project.id);
}

export function retrieveProject(project) {
  const storedProject = localStorage.getItem(project.id);

  //check to see the project was saved
  if (!storedProject) throw new Error("No project found");

  return JSON.parse(storedProject);
}
