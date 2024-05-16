import { AppService } from './app.service';
import { Engineer } from './models/engineer.model';
import { Task } from './models/task.model';

describe('AppService', () => {
  let service: AppService;
  let engineers: Engineer[];
  let tasks: Task[];

  beforeEach(() => {
    service = new AppService();
    engineers = [
      new Engineer('John Doe', ['JavaScript', 'TypeScript']),
      new Engineer('Jane Doe', ['Python', 'JavaScript']),
    ];
    tasks = [
      new Task('Task 1', ['JavaScript'], 2),
      new Task('Task 2', ['Python'], 3),
      new Task('Task 3', ['TypeScript'], 4),
    ];
  });

  it('should return hello world', () => {
    expect(service.getHello()).toBe('Hello World!');
  });

  it('should assign tasks to engineers', () => {
    const result = service.assignTasks(engineers, tasks);
    expect(result['John Doe']).toContain(tasks[0]);
    expect(result['Jane Doe']).toContain(tasks[1]);
    expect(result['John Doe']).toContain(tasks[2]);
  });

  it('should not assign tasks if no engineer can complete them', () => {
    tasks = [new Task('Task 4', ['Java'], 2)];
    const result = service.assignTasks(engineers, tasks);
    expect(result['Unassigned']).toContain(tasks[0]);
  });

  it('should not assign tasks if they exceed the maximum workload', () => {
    tasks = [new Task('Task 5', ['JavaScript'], 50)];
    const result = service.assignTasks(engineers, tasks);
    expect(result['Unassigned']).toContain(tasks[0]);
  });
});