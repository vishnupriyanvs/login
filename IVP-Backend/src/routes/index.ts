import { CandidateCategory } from "../models/candidateCategories";

const express = require('express');
const router = express.Router();


const categoryRouter = require('./categories.route');
const candidateRouter= require('./candidates.route')
const questionRouter = require('./questions.route');
const employeeRouter = require('./employees.route');
const roleRouter = require('./roles.route');
const msalRoutes = require('./msal.route')
const interviewRouter = require('./interview.route');
const candidateCategoryRouter = require('./candidateCategories.route');
const interviewCandidateRouter = require('./interviewCandidate.route')


router.use('/admin', categoryRouter);
router.use('/admin', candidateRouter);
router.use('/admin', questionRouter);
router.use('/admin', employeeRouter);
router.use('/admin', roleRouter);
router.use('/admin', interviewRouter);
router.use('/admin', candidateCategoryRouter);
router.use('/admin',interviewCandidateRouter);
router.use('/admin',candidateRouter);
router.use('/microsoft-login',msalRoutes);





module.exports = router;