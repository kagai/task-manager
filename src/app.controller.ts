import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Task } from './models/task.model';
import { Engineer } from './models/engineer.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('assign-tasks')
  // assignTasks(
  //   @Body() body: { available_engineers: Engineer[]; tasks: Task[] },
  // ): { [engineerName: string]: Task[] } {
  //   const { available_engineers, tasks } = body;
  //   return this.appService.initializer(available_engineers, tasks);
  // }
}
