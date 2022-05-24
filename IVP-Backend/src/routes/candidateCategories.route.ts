import { Router } from 'express'
const router = Router()
import { CandidateCategoryController } from '../controller/candidateCategories.controller';

const categoryController = new CandidateCategoryController();

//for getting list of all categories
router.get('/candidatecategories',categoryController.getCategoryList);
router.get('/candidatecategories/:id',categoryController.getCategoryById);

// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
router.post('/candidatecategories',categoryController.addCategory);


module.exports = router