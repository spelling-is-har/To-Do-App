export class Task {
  constructor(title, dueDate, priority, notes) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    //give the object an id for later identification
    this.id = crypto.randomUUID();
    //Tasks are not complete by default and must be set to complete after creation
    this.isComplete = false;
  }
}
