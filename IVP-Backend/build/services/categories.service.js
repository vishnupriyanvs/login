"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const categories_1 = require("../models/categories");
const questions_1 = require("../models/questions");
class CategoryService {
    static get EmployeeList() {
        /* When only selected fields required go for the below code */
        //return ['id','role_id'];
        return ({});
    }
    /* To get the list of all categories*/
    getAllCategories() {
        return categories_1.Category.findAll();
    }
    createCategory(category) {
        var newCategory = new categories_1.Category(category);
        return newCategory.save();
    }
    findByCategoryId(id) {
        return categories_1.Category.findByPk(id);
    }
    findByName(name) {
        return categories_1.Category.findOne({
            where: {
                categoryName: name
            }
        });
    }
    findQuestionsByCategoryId(id) {
        return questions_1.Question.findAll({
            where: { status: 'active' },
            include: [{
                    model: categories_1.Category,
                    where: { id: id }
                }],
        });
    }
    findQuestionsByCategoryName(id) {
        return questions_1.Question.findAll({
            include: [{
                    model: categories_1.Category,
                    where: { id: id }
                }],
        });
    }
    findAllCategoryQuestions() {
        return questions_1.Question.findAll({
            include: [{
                    model: categories_1.Category,
                }],
        });
    }
}
exports.CategoryService = CategoryService;
