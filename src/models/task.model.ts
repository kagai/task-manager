import { Engineer } from './engineer.model';

export class Task {
  title: string;
  skills_required: string[];
  duration: number;
  assignedEngineer?: Engineer;

  constructor(title: string, skills_required: string[], duration: number) {
    this.title = title;
    this.skills_required = skills_required;
    this.duration = duration;
  }

  assignTo(engineer: Engineer) {
    engineer.assignTask(this);
  }
}
