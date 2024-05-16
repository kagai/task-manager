import { Task } from './task.model';
import { Engineer } from './engineer.model';

describe('Task', () => {
  let task: Task;
  let engineer: Engineer;

  beforeEach(() => {
    task = new Task('Task 1', ['JavaScript'], 2);
    engineer = new Engineer('John Doe', ['JavaScript', 'TypeScript']);
  });

  it('should assign the task to an engineer', () => {
    task.assignTo(engineer);
    expect(task.assignedEngineer).toBe(engineer);
    expect(engineer.assignedTasks).toContain(task);
  });

  it('should not assign the task if the engineer does not have the necessary skills', () => {
    engineer = new Engineer('John Doe', ['Python']);
    expect(() => task.assignTo(engineer)).toThrowError();
  });

  it('should not assign the task if it exceeds the maximum workload', () => {
    task = new Task('Task 2', ['JavaScript'], 50);
    expect(() => task.assignTo(engineer)).toThrowError();
  });
});
