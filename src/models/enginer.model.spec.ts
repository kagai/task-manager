import { Engineer } from './engineer.model';
import { Task } from './task.model';

describe('Engineer', () => {
  let engineer: Engineer;
  let task: Task;

  beforeEach(() => {
    engineer = new Engineer('John Doe', ['JavaScript', 'TypeScript']);
    task = new Task('Task 1', ['JavaScript'], 2);
  });

  it('should assign a task to the engineer', () => {
    engineer.assignTask(task);
    expect(engineer.assignedTasks).toContain(task);
    expect(task.assignedEngineer).toBe(engineer);
  });

  it('should not assign a task if the engineer does not have the necessary skills', () => {
    task = new Task('Task 2', ['Python'], 2);
    expect(() => engineer.assignTask(task)).toThrowError();
  });

  it('should not assign a task if it exceeds the maximum workload', () => {
    task = new Task('Task 3', ['JavaScript'], 50);
    expect(() => engineer.assignTask(task)).toThrowError();
  });

  it('should complete a task', () => {
    engineer.assignTask(task);
    engineer.completeTask(task);
    expect(engineer.assignedTasks).not.toContain(task);
  });

  it('should check if the engineer can complete a task', () => {
    expect(engineer.canCompleteTask(task)).toBe(true);
    task = new Task('Task 4', ['Python'], 2);
    expect(engineer.canCompleteTask(task)).toBe(false);
  });

  it("should calculate the engineer's workload", () => {
    engineer.assignTask(task);
    expect(engineer.workload).toBe(2);
  });
});
