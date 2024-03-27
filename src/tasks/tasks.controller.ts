import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';


@Controller()
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }
  jobId:string;
  @HttpCode(HttpStatus.OK)
  @Post('task')
  async HandleTasks(@Body() body: any) {
    // await this.tasksService.HandleTasks(body);
    // return body;
    const response = await this.tasksService.HandleTasks(body);
    console.log("🚀 ~ TasksController ~ HandleTasks ~ response:", response)
    return {'response generated is ':response};
  }

  @Get('check')
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get('stop/:id')
  async findOne(@Param('id') id: number) {
    const response= await this.tasksService.StopJob(id);
    return {'response generated is ':response};
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tasksService.remove(+id);
  // }
}
