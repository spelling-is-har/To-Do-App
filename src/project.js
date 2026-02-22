export class Project {
  constructor(title, dueDate, description) {
    this.title = title;
    this.dueDate = dueDate;
    this.description = description;
    //id for later identification
    this.id = "project" + crypto.randomUUID();
    this.tasks = [];
    //project are not complete by default and must be set to complete manually by the user
    this.isComplete = false;
  }
}
