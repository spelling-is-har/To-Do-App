export function saveProject(project) {
  //check to see if there is a project to be saved
  if (!project) throw new Error("No Project to save");

  //stringifys project for storage
  localStorage.setItem(project.id, JSON.stringify(project));
}

export function deleteProject(projectId) {
  //check to see if a project has been provided for deletion
  if (!projectId) throw new Error("No Project to delete");

  //check to see the project exists in local storage
  const storedProject = localStorage.getItem(projectId);
  if (!storedProject) throw new Error("Project does not exist");

  localStorage.removeItem(projectId);
}

export function retrieveProject(projectId) {
  const storedProject = localStorage.getItem(projectId);

  //check to see the project was saved
  if (!storedProject) throw new Error("No project found");

  return JSON.parse(storedProject);
}
