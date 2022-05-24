import { Router } from 'express'
const router = Router()


import { InterviewController } from '../controller/interview.controller';

const interviewController = new InterviewController();

router.post('/interview',interviewController.addInterview);
router.get('/interview/:interviewid',interviewController.getQuestionsByInterviewId);
router.get('/interview/status/:statusname',interviewController.getInterviewByStatusName);
router.get('/interview',interviewController.getAllInterview);
router.put('/interview/:interviewid',interviewController.updateInterview);

module.exports = router