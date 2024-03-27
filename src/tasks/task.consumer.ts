import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";



@Processor('handle-bg-tasks')
export class TaskConsumer {
    constructor() { }

    // @Process('generate-report-job')
    @Process('handle-task')
    async generateTaskmethod(job: Job<unknown>) {
        console.log('````````````````job recieved at consumer is , : ', job.data, 'Will take 10 seconds ``````````````````')
        const printStatement = () => {
            console.log('Processing Completed in 10 seconds ...');
        }
        setTimeout(printStatement, 10000);
        console.log('task processing .....');
    }

   

}
