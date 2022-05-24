"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const questions_controller_1 = require("../controller/questions.controller");
const questionController = new questions_controller_1.QuestionController();
//for getting list of all questions
router.get('/questions', questionController.getAllQuestions);
router.get('/questions/:id', questionController.getQuestionById);
router.put('/question/:id', questionController.updateQuestionById);
router.post('/questions', questionController.addQuestion);
module.exports = router;
