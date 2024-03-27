import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { BullModule } from '@nestjs/bull';
import { TaskConsumer } from './task.consumer';

@Module({
  controllers: [TasksController],
  providers: [TasksService,TaskConsumer],
})
export class TasksModule {}
