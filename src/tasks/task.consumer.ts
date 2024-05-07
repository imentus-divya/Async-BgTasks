import { Process, Processor, OnQueueActive, OnQueueCompleted } from "@nestjs/bull";
import { Job } from "bull";
import { Queue, Worker } from 'bullmq'



@Processor('handle-bg-tasks')

export class TaskConsumer {
    constructor() { }
    private count = 1;

    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Active job ${job.id}`);
    }
    @OnQueueCompleted()
    onCompleted(job: Job) {
        console.log(`Job ${job.id} has been completed`);
    }



    @Process('handle-task1')
    async generateTask1method(job: Job<unknown>) {
        console.log('````````````````job recieved at consumer is , : ', job.data, 'Will take 10 seconds ``````````````````')
        let product = 1;

        const printStatement = async (job: Job): Promise<any> => {
            // const
            // await this.jobStatus(job: Job)
            const Number = 10;
            product = Number * Number;
            // console.log("🚀 ~ TaskConsumer ~ printStatement ~ product:", product)
            // await job.update({Recieved_Data : Number , Processed_Data :product})
            await job.progress({ step: 'completed . . .', percentage: 100 });
            console.log("🚀 ~ Task completed . . . ......and count is : ", this.count)
            this.count++;
        }

        setInterval(() => {
            printStatement(job);
        }, 1000);

        

    }


  

    async checkStop(job_id) {

    }

    // TASK2
    @Process('handle-task2')
    async generateTask2method(job: Job) {


    }



}
