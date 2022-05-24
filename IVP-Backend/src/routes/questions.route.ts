import { Router } from 'express'
const router = Router()


import { QuestionController } from '../controller/questions.controller';

const questionController = new QuestionController();

//for getting list of all questions
router.get('/questions',questionController.getAllQuestions);
router.get('/questions/:id',questionController.getQuestionById);
router.put('/question/:id',questionController.updateQuestionById);
router.post('/questions',questionController.addQuestion);


module.exports = router

