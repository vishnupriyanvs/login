"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const candidates_controller_1 = require("../controller/candidates.controller");
const candidateController = new candidates_controller_1.CandidateController();
//for getting list of all categories
router.get('/candidates', candidateController.getCandidateList);
router.get('/candidate/:id', candidateController.getCandidateById);
// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
router.post('/candidate', candidateController.addCandidate);
module.exports = router;
