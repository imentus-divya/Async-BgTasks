import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";



@Processor('handle-bg-tasks')
export class TaskConsumer {
    constructor() { }

    // @Process('generate-report-job')
    @Process('handle-task1')
    async generateTask1method(job: Job<unknown>) {
        console.log('````````````````job 1 recieved at consumer is , : ', job.data, 'Will take 50 seconds ``````````````````')
        const printStatement = () => {
            console.log('Processing  of task1 Completed in 50 seconds ...');
        }
        setTimeout(printStatement, 50000);
        console.log('task1 processing .....');
    }

    // TASK2
    @Process('handle-task2')
    async generateTask2method(job: Job<unknown>) {
        console.log('````````````````job 2 recieved at consumer is , : ', job.data, 'Will take 20 seconds ``````````````````')
        const printStatement = () => {
            console.log('Processing of task2 Completed in 20 seconds ...');
        }
        setTimeout(printStatement, 20000);
        console.log('task2 processing .....');
    }

   

}
