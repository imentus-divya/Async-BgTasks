import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { BullModule } from '@nestjs/bull';
import { TaskConsumer } from './task.consumer';

@Module({
  imports: [ 
  //   BullModule.forRoot({
  //  redis: {
  //    host: 'localhost',
  //    port: 6379,
  //  },}),
  //  BullModule.registerQueue({
  //    name: 'handle-bg-tasks'
  //  })
  ],
  controllers: [TasksController],
  providers: [TasksService,TaskConsumer],
})
export class TasksModule {}
