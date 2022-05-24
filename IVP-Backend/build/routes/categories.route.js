"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const categories_controller_1 = require("../controller/categories.controller");
const categoryController = new categories_controller_1.CategoryController();
//for getting list of all categories
router.get('/categories', categoryController.getCategoryList);
router.get('/categories/:id', categoryController.getCategoryById);
router.get('/question/:category_id', categoryController.getQuestionsByCategoryId);
router.get('/allquestion/:categoryname', categoryController.getQuestionsByCategoryName);
router.get('/allquestion', categoryController.getAllCategoryQuestions);
// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
router.post('/categories', categoryController.addCategory);
module.exports = router;
