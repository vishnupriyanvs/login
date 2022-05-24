import { Router } from 'express'
const router = Router()


import { CandidateController } from '../controller/candidates.controller';

const candidateController = new CandidateController();

//for getting list of all categories
router.get('/candidates',candidateController.getCandidateList);
router.get('/candidate/:id',candidateController.getCandidateById);
// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
router.post('/candidate',candidateController.addCandidate);


module.exports = router