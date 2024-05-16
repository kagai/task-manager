/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Engineer } from './models/engineer.model';
import { Task } from './models/task.model';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  assignTasks(available_engineers: Engineer[],tasks: Task[]): { [engineerName: string]: Task[] } {
    const engineerToTasks: { [engineerName: string]: Task[] } = {};
    const unassignedTasks: Task[] = [];

    // Sort engineers by workload in ascending order(performance optimization to O(n log m))
    available_engineers.sort((a, b) => a.workload - b.workload);

    for (const task of tasks) {
      let bestEngineer: Engineer | undefined;

      for (const engineer of available_engineers) {
        if (
          engineer.canCompleteTask(task) &&
          engineer.workload + task.duration <= 48
        ) {
          bestEngineer = engineer;
          break; // As the engineers are sorted by workload, we can break once we find a suitable engineer
        }
      }

      if (bestEngineer) {
        bestEngineer.assignTask(task);
        if (!engineerToTasks[bestEngineer.name]) {
          engineerToTasks[bestEngineer.name] = [];
        }
        engineerToTasks[bestEngineer.name].push(task);

        // Re-sort engineers after assigning a task
        available_engineers.sort((a, b) => a.workload - b.workload);
      } else {
        unassignedTasks.push(task);
        console.log(`No engineer available to complete task ${task.title}`);
      }
    }

    if (unassignedTasks.length > 0) {
      engineerToTasks['Unassigned'] = unassignedTasks;
    }

    return engineerToTasks;
  }
  initializer(available_engineers: any[], available_tasks: any[]) {
    const engineers = available_engineers.map(
      (e) => new Engineer(e.name, e.skills),
    );
    const tasks = available_tasks.map(
      (t) => new Task(t.title, t.requiredSkills, t.duration),
    );

    const result = this.assignTasks(engineers, tasks);
    return result;
  }
}
