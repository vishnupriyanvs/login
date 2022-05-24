import { InterviewQuestions } from "../models/interviewQuestions";
import { Question } from "../models/questions";
import { Interview } from "../models/interviews";

// const DB = require('../models/index');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database')

export class InterviewQuestionService {

    createInterviewQuestions(interviewQuestions: any) {
        var newInterviewQuestions = new InterviewQuestions(interviewQuestions);
        return newInterviewQuestions.save();
    }

    // async findQuestionsByInterviewId(interview_id: any) {
    //     return Interview.findAll({
    //         include:[{
    //             model:InterviewQuestions,
    //             where:{
    //                 interview_id:interview_id
    //             },
    //             // attributes:{exclude:['question_id','interview_id','questionId','interviewId',"createdAt","updatedAt"]},
    //             attributes:['id'
    //             ],
    //             include:[{
    //                 model:Question,
    //                 attributes:['id','question','status'],

    //             }]
    //         }],
    //         attributes:['id','interviewTitle','status']

    //     })

    deleteInterviewQuestions(interview_id: any,delete_id:any) {
        InterviewQuestions.destroy({ where: { interview_id:  interview_id } })
    }







    // return DB.sequelize.query("SELECT * FROM interview_questions")
    // return InterviewQuestions.findAll({
    //     include: [{
    //         model: Interview,
    //         where:{
    //             id:interview_id
    //         },
    //         required: true,
    //         attributes: ['id']
    //       },
    //       {
    //         model: Question,
    //         required: true,
    //         attributes: ['id','question']
    //       }],
    //       attributes:['id']
    // })
    // }


}