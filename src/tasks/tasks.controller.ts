import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { BullBoardInstance, InjectBullBoard } from "@bull-board/nestjs";

@Controller()
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    @InjectBullBoard() private readonly boardInstance: BullBoardInstance
    ) { }

  @HttpCode(HttpStatus.OK)
  @Post('task1')
  async HandleTask1(@Body() body: any) {
    const response = await this.tasksService.HandleTask1(body);
    console.log("🚀 ~Task1 Controller ~ response:", response)
    return {'response generated TASK1 ':response};
  }

  @HttpCode(HttpStatus.OK)
  @Post('task2')
  async HandleTask2(@Body() body: any) {
    const response = await this.tasksService.HandleTask2(body);
    console.log("🚀 ~ Task2 Controller ~ response:", response)
    return {'response generated TASK2 ':response};
  }

  @HttpCode(HttpStatus.OK)
  @Post('stopAll')
  async stopAll() {
    return this.tasksService.stopAll();
  }
  
  @HttpCode(HttpStatus.OK)
  @Get('stop/:id')
  async StopJob(@Param('id') id: number) {
    const response= await this.tasksService.StopJob(id);
    return {'response generated is ':response};
    
  }




}
