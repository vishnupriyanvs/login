"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const candidateCategories_1 = require("../models/candidateCategories");
class CategoryService {
    /* To get the list of all categories*/
    getAllCategories() {
        return candidateCategories_1.candidateCategories.findAll();
    }
    createCategory(category) {
        var newCategory = new candidateCategories_1.candidateCategories(category);
        return newCategory.save();
    }
    findByCategoryId(id) {
        return candidateCategories_1.candidateCategories.findByPk(id);
    }
}
exports.CategoryService = CategoryService;
