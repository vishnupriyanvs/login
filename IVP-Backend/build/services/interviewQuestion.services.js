"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewQuestionService = void 0;
const interviewQuestions_1 = require("../models/interviewQuestions");
// const DB = require('../models/index');
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
class InterviewQuestionService {
    createInterviewQuestions(interviewQuestions) {
        var newInterviewQuestions = new interviewQuestions_1.InterviewQuestions(interviewQuestions);
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
    deleteInterviewQuestions(interview_id, delete_id) {
        interviewQuestions_1.InterviewQuestions.destroy({ where: { interview_id: interview_id } });
    }
}
exports.InterviewQuestionService = InterviewQuestionService;
