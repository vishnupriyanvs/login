import { Request, Response } from "express";
import { Interview } from "../models/interviews";
import { Question } from "../models/questions";
import { InterviewService } from "../services/interview.services";
import { InterviewQuestionService } from "../services/interviewQuestion.services";
import { QuestionService } from "../services/questions.service";
import db from "../config/database"
import { EnumDataType } from "sequelize/types";
import { InterviewOutput } from "../models/interviews";

const { QueryTypes } = require('sequelize');
const interviewServices = new InterviewService();
const interviewQuestionService = new InterviewQuestionService();
const questionService = new QuestionService();
const sequelize = require('../config/database')

export class InterviewController {

    // create interview

    async addInterview(req: Request, res: Response) {
        var interview = req.body;
        var questions = interview.question_id;
        try {
            const Interview: InterviewOutput = await interviewServices.createInterview(interview)

            var interview_id = Interview.id;
            for (var i = 0; i < questions.length; i++) {
                var question_id: any = interview.question_id[i];
                let interviewQuestions = {
                    interviewId: interview_id,
                    questionId: question_id
                }
                interviewQuestionService.createInterviewQuestions(interviewQuestions)
            }
            res.send(Interview)


        }
        catch (error) {
            res.send(error);
        }

    }



    //get questions by interview id
    async getQuestionsByInterviewId(req: Request, res: Response) {
        let interviewId: string = req.params.interviewid;
        return db.query(`SELECT interviews.interview_title,interview_questions.question_id,interview_questions.interview_id,questions.question FROM interview_questions INNER JOIN questions ON interview_questions.question_id = questions.id INNER JOIN interviews ON interview_questions.interview_id = interviews.id WHERE interview_questions.interview_id = ${interviewId}`, { type: QueryTypes.SELECT })
            .then((data: any) => {
                console.log(data);
                res.send(data);
            })
            .catch((error: any) => {
                res.send("error")
            })
            .catch((error: any) => {
                res.send(error)
            })
    }

    // update interview
    async updateInterview(req: any, res: any) {
        var interview = req.body;
        var interviewId: number = req.params.interviewid;
        var questions = interview.question_id;
        var deleteQuestions = interview.delete_question_id
        interviewServices.updateInterview(interview, interviewId)
            .then((data: any) => {
                if (deleteQuestions.length !== 0) {
                    for (var i = 0; i < deleteQuestions.length; i++) {
                        var deleteQuestionId: any = interview.delete_question_id[i];
                        interviewQuestionService.deleteInterviewQuestions(interviewId, deleteQuestionId)
                    }
                }
                if (questions.length !== 0) {
                    for (var i = 0; i < questions.length; i++) {
                        var question_id: any = interview.question_id[i];
                        let interviewQuestions = {
                            interviewId: interviewId,
                            questionId: question_id
                        }
                        interviewQuestionService.createInterviewQuestions(interviewQuestions)
                    }
                }
                res.send("success")

            })
            .catch(() => {
                res.send("error")
            })
    }

    // async updateInterview(req: any, res: any) {
    //     var interview = req.body;
    //     var interviewId: number = req.params.interviewid;
    //     var questions = interview.question_id;
    //     interviewServices.updateInterview(interview, interviewId)
    //         .then((data: any) => {
    //             interviewQuestionService.deleteInterviewQuestions(interviewId)
    //             if (questions.length !== 0) {
    //                 for (var i = 0; i < questions.length; i++) {
    //                     var question_id: any = interview.question_id[i];
    //                     let interviewQuestions = {
    //                         interviewId: interviewId,
    //                         questionId: question_id
    //                     }
    //                     interviewQuestionService.createInterviewQuestions(interviewQuestions)
    //                 }
    //             }
    //             res.send("success")

    //         })
    //         .catch(() => {
    //             res.send("error")
    //         })
    // }

    //get all interviews
    async getAllInterview(req: Request, res: Response) {
        try {
            const Interviews = await interviewServices.findAllInterviews()
            if (Object.keys(Interviews).length !== 0)
                res.status(200).send({ message: "interviews retrieved successfully", Interviews });
            else
                res.status(401).send({ message: "interview table is empty" })
        }
        catch (error) {
            res.status(401).send(error)
        }
    }

    async getInterviewByStatusName(req: Request, res: Response) {

        try {
            const Interview = await interviewServices.findByStatus(req.params.statusname)
            res.send(Interview)
        }
        catch (error) {
            res.send(error)
        }

    }

}