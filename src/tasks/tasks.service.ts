import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { TaskConsumer } from './task.consumer';

// PRODUCER

@Injectable()
export class TasksService {
  constructor(@InjectQueue('handle-bg-tasks')
  private task_queue: Queue) { }

  async HandleTask1(task: any) {
    console.log("🚀 task1:", task)
    // const job = await this.task_queue.add('handle-task1', { number: task }, { removeOnComplete: true, removeOnFail: true })
    const job = await this.task_queue.add('handle-task1', { number: task })

    console.log("🚀 jobId : job.id-------1--------:", job.id)
    return { message: 'Processing the request 1. . . ', jobId: job.id }
  }
  async HandleTask2(task: any) {
    console.log("🚀 task:", task)
    const job = await this.task_queue.add('handle-task2', { number: task })
    console.log("🚀 jobId : job.id----------2-----------:", job.id)
    return { message: 'Processing the request 2. . . ', jobId: job.id }
  }

  async Check() {
    console.log("This is check API")
    return 'CHECK API WORKING ....'
  }
  async StopJob(id: number) {
    console.log("🚀 ~ TasksService ~ StopJob ~ id:", id)
    const jobExits = await this.task_queue.getJob(id);
    console.log("🚀 ~ TasksService ~ StopJob ~ jobExits:", jobExits)
    if (jobExits) {
      console.log('job exists :-')
      console.log("job name : ", jobExits.name)
      console.log("Queue name : ", jobExits.queue.name)
      await jobExits.remove();
      return { ' removed job id ': id , 'data present in job :': jobExits.data}
    }
    else {
      return { 'job id not present in queue : ': id }
    }

  }



}
