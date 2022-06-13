import { Context } from 'near-sdk-as';
import { Task } from './Models/Task';
import { TaskInfo } from './Models/TaskInfo';
import { TaskManager } from './Models/TaskManager';
import { MY_TASKS } from './utils/database';

@nearBindgen
export class Contract {
	newTask(title: String): TaskInfo {
		const signer = Context.sender;
		if (MY_TASKS.contains(signer)) {
			const taskManager = MY_TASKS.getSome(signer);
			const createdTask = taskManager.addTask(title);
			MY_TASKS.set(signer, taskManager);
			return createdTask;
		}

		const taskManager = new TaskManager();
		const createdTask = taskManager.addTask(title);
		MY_TASKS.set(signer, taskManager);
		return createdTask;
	}

	showTask(taskId: i32): TaskInfo | null {
		const signer = Context.sender;
		if (MY_TASKS.contains(signer)) {
			const taskManager = MY_TASKS.getSome(signer);
			return taskManager.getTask(taskId);
		}
		return null;
	}

	showAllTasks(): Task[] | null {
		const signer = Context.sender;
		if (MY_TASKS.contains(signer)) {
			const taskManager = MY_TASKS.getSome(signer);
			return taskManager.getAllTasks();
		}
		return null;
	}

	startTask(taskId: i32): bool {
		const signer = Context.sender;
		if (MY_TASKS.contains(signer)) {
			const taskManager = MY_TASKS.getSome(signer);
			const isStarted = taskManager.startTask(taskId);
			MY_TASKS.set(signer, taskManager);
			return isStarted;
		}
		return false;
	}

	completeTask(taskId: i32): bool {
		const signer = Context.sender;
		if (MY_TASKS.contains(signer)) {
			const taskManager = MY_TASKS.getSome(signer);
			const isCompleted = taskManager.completeTask(taskId);
			MY_TASKS.set(signer, taskManager);
			return isCompleted;
		}
		return false;
	}

	removeTask(taskId: i32): Task | null {
		const signer = Context.sender;
		if (MY_TASKS.contains(signer)) {
			const taskManager = MY_TASKS.getSome(signer);
      const task = taskManager.removeTask(taskId);
      MY_TASKS.set(signer, taskManager);
			return task;
		}
		return null;
	}
}
