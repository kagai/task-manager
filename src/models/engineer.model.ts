import { Task } from './task.model';

export class Engineer {
  name: string;
  skills: string[];
  assignedTasks: Task[];

  constructor(name: string, skills: string[]) {
    this.name = name;
    this.skills = skills;
    this.assignedTasks = [];
  }
  //TODO: Move max workload to a configuration file
  assignTask(task: Task) {
    const MAX_WORKLOAD = 48; // Maximum workload in hours

    if (
      this.canCompleteTask(task) &&
      this.workload + task.duration <= MAX_WORKLOAD
    ) {
      this.assignedTasks.push(task);
      task.assignedEngineer = this;
    } else {
      throw new Error(
        `${this.name} doesn't have the necessary skills for task ${task.title} or the task exceeds the maximum workload`,
      );
    }
  }

  completeTask(task: Task) {
    const index = this.assignedTasks.indexOf(task);
    if (index >= 0) {
      this.assignedTasks.splice(index, 1);
    }
  }

  canCompleteTask(task: Task): boolean {
    return task.skills_required.every((skill) => this.skills.includes(skill));
  }

  get workload(): number {
    return this.assignedTasks.reduce(
      (totalDuration, task) => totalDuration + task.duration,
      0,
    );
  }
  // TODO: Move max workload to a configuration file
  get availability(): boolean {
    const MAX_WORKLOAD = 48; // Maximum workload in hours
    return this.workload < MAX_WORKLOAD;
  }
}
