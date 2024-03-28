import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";



@Processor('handle-bg-tasks')
export class TaskConsumer {
    constructor() { }
    private count=1;
    // @Process('generate-report-job')
    @Process('handle-task1')
    async generateTask1method(job: Job<unknown>) {
        console.log('````````````````job recieved at consumer is , : ', job.data, 'Will take 10 seconds ``````````````````')
    let product=1;
       
        const printStatement = async(job:Job):Promise<any>=>{
            const Number = job.data.number.number;
            product=Number*Number;     
            // console.log("🚀 ~ TaskConsumer ~ printStatement ~ product:", product)
            await job.update({Recieved_Data : Number , Processed_Data :product})
            await job.progress({ step: 'completed . . .', percentage: 100 });
            await job.finished();
            console.log("🚀 ~ Task completed . . . ......and count is : ",this.count)
            this.count++;
        }

        setTimeout(() => {
            printStatement(job);
        }, 10000);

        console.log('task1 processing .....');
    }

    // TASK2
    @Process('handle-task2')
    async generateTask2method(job: Job) {
        let sum=0;
        console.log('````````````````job 2 recieved at consumer is , : ', job.data, 'Will take 10 seconds ``````````````````')
        
        const printStatement = async(job:Job):Promise<any>=>{
            const Number = job.data.number.number;
            sum=Number+Number;     
            console.log("🚀 ~  ~ sum:", sum)
            await job.update({Recieved_Data : Number , Processed_Data:sum })
            await job.progress({ step: 'completed . . .', percentage: 100 });
            await job.finished();
            console.log("🚀 ~ Task2 completed . . .")

        }

        setTimeout(() => {
            printStatement(job);
        }, 10000);

        console.log('task2 processing .....');
    }

   

}
