import { where } from "sequelize/types";
import { Interview } from "../models/interviews"


export class InterviewService{

    createInterview(interview:any){
        var newInterview = new Interview(interview);
        return newInterview.save();
    }

    findByTitle(title:any) {
        return Interview.findOne({
            where:{
                interviewTitle:title
            }
        })
    }
    findByStatus(status:string) {
        return Interview.findAll({
            where:{
                status:status
            }
        })
    }

    findAllInterviews(){
        return Interview.findAll()
    }

    updateInterview(interview:any,interview_id:number){
        var interviewTitle = interview.interviewTitle;
        var interviewStatus = interview.status;

        var updateInterview ={
            interviewTitle:interviewTitle,
            status:interviewStatus
        }
        return Interview.update(updateInterview,{where:{id:interview_id}})
        
    }

}