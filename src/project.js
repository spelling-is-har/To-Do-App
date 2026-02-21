export class Project {
  constructor(title, dueDate, description) {
    this.title = title;
    this.dueDate = dueDate;
    this.description = description;
    //id for later identification
    this.id = "project" + crypto.randomUUID();
    this.tasks = [];
  }
}
