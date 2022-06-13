import { TaskStatus } from '../utils/enums';
import { Task } from './Task';
import { TaskInfo } from './TaskInfo';

@nearBindgen
export class TaskManager {
	tasks: Task[] = [];

	addTask(title: String): TaskInfo {
		const task = new Task(title);
		const id = this.tasks.push(task);
		return new TaskInfo(task, id);
	}

	startTask(taskId: i32): bool {
		if (taskId >= this.tasks.length) return false;
		this.tasks[taskId].status = TaskStatus.ACTIVE;
		return true;
	}

	completeTask(taskId: i32): bool {
		if (taskId >= this.tasks.length) return false;
		this.tasks[taskId].status = TaskStatus.COMPLETED;
		return true;
	}

	getTask(taskId: i32): TaskInfo | null {
		if (taskId >= this.tasks.length) return null;
		const task = this.tasks[taskId];
		return new TaskInfo(task, taskId);
	}

	getAllTasks(): Task[] {
		return this.tasks;
	}

	removeTask(taskId: i32): Task | null {
		if (taskId >= this.tasks.length) return null;

		const tempTasks: Task[] = [];
		let removedTask: Task | null = null;

		for (let i = 0; i < this.tasks.length; i++) {
			const task = this.tasks[i];
			if (taskId !== i) {
				tempTasks.push(task);
			} else {
				removedTask = task;
			}
		}
		this.tasks = tempTasks;

		return removedTask;
	}
}
