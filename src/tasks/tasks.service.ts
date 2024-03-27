import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { TaskConsumer } from './task.consumer';

// PRODUCER

@Injectable()
export class TasksService 
{
  constructor(@InjectQueue('handle-bg-tasks')
  private task_queue:Queue){}

  async HandleTasks(task: any) {
    console.log("🚀 task:", task)
     const job = await this.task_queue.add('handle-task', {number : task} ,{ removeOnComplete: true, removeOnFail: true })
    console.log("🚀 jobId : job.id:",  job.id)
    return {message : 'Processing the request . . . ' ,jobId : job.id}
}
 
async findAll()
{
  console.log("This is check API")
  return 'CHECK API WORKING ....'
}
async StopJob(id: number)
{
 const jobExits= await this.task_queue.getJob(id);
 if(jobExits)
 {
  console.log('job exists :-')
  console.log("job name : ",jobExits.name)
  console.log("Queue name : ",jobExits.queue.name)
  await jobExits.remove();
  return {' removed job id ': id}
 }
 else
 {
  return { 'job id not present in queue : ' : id}
 }
  
}


 
}
