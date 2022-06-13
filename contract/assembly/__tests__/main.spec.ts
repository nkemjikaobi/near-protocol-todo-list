import { Contract } from '../index';
import { VMContext } from 'near-sdk-as';
import { TaskManager } from '../Models/TaskManager';
import { MY_TASKS } from '../utils/database';
import { TaskInfo } from '../Models/TaskInfo';
import { Task } from '../Models/Task';
import { TaskStatus } from '../utils/enums';

const contract = new Contract();
const signer = 'derickobi.testnet';
let task: TaskInfo;

describe('Tasks', () => {
	beforeEach(() => {
		VMContext.setSigner_account_id(signer);
		task = contract.newTask('Write backend code!');
	});

	it('Should add new Task', () => {
		const taskmanager: TaskManager = MY_TASKS.getSome(signer);
		const mytasks = taskmanager.tasks;
		log(task);
		expect(task.title).toStrictEqual(
			mytasks[task.id].title,
			'Expect equal object'
		);
	});

	it('Should retrieve added Task', () => {
		const taskmanager: TaskManager = MY_TASKS.getSome(signer);
		const mytasks = taskmanager.tasks;
		const firstTask = <TaskInfo>contract.showTask(0);
		const allTasks = <Task[]>contract.showAllTasks();

		expect(firstTask).not.toBeNull();
		expect(firstTask.title).toStrictEqual(mytasks[0].title);
		expect(allTasks.length).toStrictEqual(1);
	});

	it('Should change the state of a task', () => {
		expect(contract.startTask(0)).toBeTruthy();
		contract.completeTask(0);
		const taskmanager: TaskManager = MY_TASKS.getSome(signer);
		const mytasks = taskmanager.tasks;

		expect(mytasks[0].status).toStrictEqual(TaskStatus.COMPLETED);
	});

	it('Should remove task from list of tasks', () => {
		const taskmanagerBeforeRemoval: TaskManager = MY_TASKS.getSome(signer);
		const mytasksBeforeRemoval = taskmanagerBeforeRemoval.tasks;

		const removedTask = <Task>contract.removeTask(0);

		const taskmanagerAfterRemoval: TaskManager = MY_TASKS.getSome(signer);
		const mytasksAfterRemoval = taskmanagerAfterRemoval.tasks;

		expect(mytasksBeforeRemoval.length).toBeGreaterThan(
			mytasksAfterRemoval.length
		);

		expect(mytasksAfterRemoval.length).toStrictEqual(0);
  });

});
