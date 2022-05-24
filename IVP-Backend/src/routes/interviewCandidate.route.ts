import { Router } from 'express'
const router = Router()


import { InterviewCandidateController } from '../controller/interviewCandidate.controller';

const interviewCandidateController = new InterviewCandidateController();

router.get('/interviewschedule/:interviewStatus',interviewCandidateController.getInterviewCandidateDetails);

module.exports = router