import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { BullModule } from '@nestjs/bull';
import { TasksController } from './tasks/tasks.controller';
import { TaskConsumer } from './tasks/task.consumer';
import { TasksService } from './tasks/tasks.service';
import { ExpressAdapter } from "@bull-board/express";
import { BullBoardModule } from "@bull-board/nestjs";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";

@Module({
  imports: [ 
     BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },}),

    //register the bull-board module forRoot in your app.module
    BullBoardModule.forRoot({
      route: "/queue",
      adapter: ExpressAdapter
    }),

    BullModule.registerQueue({
      name: 'handle-bg-tasks',
      defaultJobOptions: {
        attempts: 2
      }
    }),
     //Register each queue using the `forFeature` method.
     BullBoardModule.forFeature({
      name: 'handle-bg-tasks',
      adapter: BullMQAdapter
    })

  ],
  controllers: [AppController,TasksController],
  providers: [AppService,TaskConsumer,TasksService],
})
export class AppModule {}
