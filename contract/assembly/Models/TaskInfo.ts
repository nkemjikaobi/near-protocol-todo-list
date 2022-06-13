import { TaskStatus } from "../utils/enums";
import { Task } from "./Task";

@nearBindgen
export class TaskInfo {
	title: String;
	status: TaskStatus;
    id: i32;
    
	constructor(task: Task, id: i32) {
		this.title = task.title;
		this.status = task.status;
		this.id = id - 1;
	}
}