import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue} from 'bull';
import { TaskConsumer } from './task.consumer';
import { Worker, Job } from 'bullmq';

// PRODUCER

@Injectable()
export class TasksService
 {
  constructor(
  @InjectQueue('handle-bg-tasks')
  private task_queue: Queue ) { }



  async HandleTask1(task: any) {
    const ac = new AbortController();
    console.log("🚀 task1:", task)
    const job = await this.task_queue.add('handle-task1', { number: task })
     return { message: 'Processing the request 1. . . ', jobId: job.id }
  }
  async HandleTask2(task: any) {
  
    const worker = new Worker(
      'handle-bg-tasks',
      async (job) => {
        // Your processing logic here
        console.log(`Processing job ${job.id}`);

        // Example delay to simulate processing
        await new Promise(resolve => setTimeout(resolve, 1000));
      },
      {
        concurrency: 1, // Process one job at a time
        connection: this.task_queue.client
      }
    );

    return worker;
  }
  async stopAll() {
    console.log("removing all jobs")

    const jobs = await this.task_queue.getJobs(['waiting', 'active', 'delayed', 'completed', 'failed']);

    for (const job of jobs) 
    {
      const jobId=job.id;
      console.log("🚀 ~ stopAll ~ jobId:", jobId)
    }
    // remove active bot from runningBot Array
    await this.task_queue.obliterate();
    // console.log("🚀 ~ Updated BotList@ StopAllBots :", this.runningBotList)
    for (const job of jobs) 
    {
      const jobId=job.id;
      console.log("🚀 ~ stopAll ~ jobId:", jobId)
    }

    return { response: 'Success', message: `All Bots with  Stopped successfully !` }
  }  
  async StopJob(id: number) 
  {
    console.log("🚀 ~ TasksService ~ StopJob ~ id:", id)
    const jobExists = await this.task_queue.getJob(id);
    if (jobExists)
     {
      if (jobExists.isActive() || jobExists.isFailed() || jobExists.isWaiting()) 
      {
        try {
          await jobExists.releaseLock();
          await jobExists.discard()
          await jobExists.moveToCompleted('this job has been stopped ',true)
          // await jobExists.remove();

          if (jobExists.isActive()) {
            const jobPromise = this.task_queue.getJob(jobExists.id)
            await jobExists.remove();
            await jobExists
        
          }
         
      
          return { removed_job_id: id, Received_Data: jobExists.data };
        } catch (error) {
          console.log("🚀 ~ Error removing job:", error);
          return { error: 'Failed to remove job', job_id: id };
        }
      }
       else {
        console.log("🚀 ~ Job is not in a removable state");
        return { error: 'Job is not in a removable state', job_id: id };
      }
    }
     else {
      console.log("🚀 ~ Job with id not found:", id);
      return { error: 'Job not found', job_id: id };
    }
  
    
    // const worker = await Worker.getWorker(workerId, 'yourQueueName');
    
    // const workers=   await this.task_queue.getWorkers();
    // console.log("🚀 ~ workers:", workers)
    
    // return { message: 'Worker stopped successfully' };
    

  }

  }


 