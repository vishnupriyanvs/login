"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const candidateCategories_controller_1 = require("../controller/candidateCategories.controller");
const categoryController = new candidateCategories_controller_1.CandidateCategoryController();
//for getting list of all categories
router.get('/candidatecategories', categoryController.getCategoryList);
router.get('/candidatecategories/:id', categoryController.getCategoryById);
// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
router.post('/candidatecategories', categoryController.addCategory);
module.exports = router;
