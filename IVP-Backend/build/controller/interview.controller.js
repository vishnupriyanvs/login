"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewController = void 0;
const interview_services_1 = require("../services/interview.services");
const interviewQuestion_services_1 = require("../services/interviewQuestion.services");
const questions_service_1 = require("../services/questions.service");
const database_1 = __importDefault(require("../config/database"));
const { QueryTypes } = require('sequelize');
const interviewServices = new interview_services_1.InterviewService();
const interviewQuestionService = new interviewQuestion_services_1.InterviewQuestionService();
const questionService = new questions_service_1.QuestionService();
const sequelize = require('../config/database');
class InterviewController {
    // create interview
    addInterview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var interview = req.body;
            var questions = interview.question_id;
            try {
                const Interview = yield interviewServices.createInterview(interview);
                var interview_id = Interview.id;
                for (var i = 0; i < questions.length; i++) {
                    var question_id = interview.question_id[i];
                    let interviewQuestions = {
                        interviewId: interview_id,
                        questionId: question_id
                    };
                    interviewQuestionService.createInterviewQuestions(interviewQuestions);
                }
                res.send(Interview);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    //get questions by interview id
    getQuestionsByInterviewId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let interviewId = req.params.interviewid;
            return database_1.default.query(`SELECT interviews.interview_title,interview_questions.question_id,interview_questions.interview_id,questions.question FROM interview_questions INNER JOIN questions ON interview_questions.question_id = questions.id INNER JOIN interviews ON interview_questions.interview_id = interviews.id WHERE interview_questions.interview_id = ${interviewId}`, { type: QueryTypes.SELECT })
                .then((data) => {
                console.log(data);
                res.send(data);
            })
                .catch((error) => {
                res.send("error");
            })
                .catch((error) => {
                res.send(error);
            });
        });
    }
    // update interview
    updateInterview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var interview = req.body;
            var interviewId = req.params.interviewid;
            var questions = interview.question_id;
            var deleteQuestions = interview.delete_question_id;
            interviewServices.updateInterview(interview, interviewId)
                .then((data) => {
                if (deleteQuestions.length !== 0) {
                    for (var i = 0; i < deleteQuestions.length; i++) {
                        var deleteQuestionId = interview.delete_question_id[i];
                        interviewQuestionService.deleteInterviewQuestions(interviewId, deleteQuestionId);
                    }
                }
                if (questions.length !== 0) {
                    for (var i = 0; i < questions.length; i++) {
                        var question_id = interview.question_id[i];
                        let interviewQuestions = {
                            interviewId: interviewId,
                            questionId: question_id
                        };
                        interviewQuestionService.createInterviewQuestions(interviewQuestions);
                    }
                }
                res.send("success");
            })
                .catch(() => {
                res.send("error");
            });
        });
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
    getAllInterview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Interviews = yield interviewServices.findAllInterviews();
                if (Object.keys(Interviews).length !== 0)
                    res.status(200).send({ message: "interviews retrieved successfully", Interviews });
                else
                    res.status(401).send({ message: "interview table is empty" });
            }
            catch (error) {
                res.status(401).send(error);
            }
        });
    }
    getInterviewByStatusName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Interview = yield interviewServices.findByStatus(req.params.statusname);
                res.send(Interview);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
}
exports.InterviewController = InterviewController;
