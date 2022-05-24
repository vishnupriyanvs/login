"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const interviewCandidate_controller_1 = require("../controller/interviewCandidate.controller");
const interviewCandidateController = new interviewCandidate_controller_1.InterviewCandidateController();
router.get('/interviewschedule/:interviewStatus', interviewCandidateController.getInterviewCandidateDetails);
module.exports = router;
