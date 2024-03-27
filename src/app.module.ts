import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { BullModule } from '@nestjs/bull';
import { TasksController } from './tasks/tasks.controller';
import { TaskConsumer } from './tasks/task.consumer';
import { TasksService } from './tasks/tasks.service';

@Module({
  imports: [ 
     BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },}),
    BullModule.registerQueue({
      name: 'handle-bg-tasks',
      defaultJobOptions: {
        attempts: 2
      }
    })
  ],
  controllers: [AppController,TasksController],
  providers: [AppService,TaskConsumer,TasksService],
})
export class AppModule {}
