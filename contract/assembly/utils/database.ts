import { PersistentMap } from "near-sdk-as";
import { TaskManager } from "../Models/TaskManager";

export const MY_TASKS = new PersistentMap<String, TaskManager>('t')