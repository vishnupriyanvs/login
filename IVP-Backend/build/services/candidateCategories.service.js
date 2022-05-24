"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateCategoryService = void 0;
const candidateCategories_1 = require("../models/candidateCategories");
class CandidateCategoryService {
    /* To get the list of all categories*/
    getAllCategories() {
        return candidateCategories_1.CandidateCategory.findAll();
    }
    createCategory(category) {
        var newCategory = new candidateCategories_1.CandidateCategory(category);
        return newCategory.save();
    }
    findByCategoryId(id) {
        return candidateCategories_1.CandidateCategory.findByPk(id);
    }
}
exports.CandidateCategoryService = CandidateCategoryService;
