"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const categories_service_1 = require("../services/categories.service");
const categoryService = new categories_service_1.CategoryService();
class CategoryController {
    /* To get the list of all categories */
    getCategoryList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AllCategories = yield categoryService.getAllCategories();
                res.status(200).send(AllCategories);
            }
            catch (error) {
                res.status(401).send(error);
                // apiErrorHandler(error, req, res, 'Fetch All Categories failed.');
            }
            ;
        });
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let category = req.body;
                const Category = yield categoryService.createCategory(category);
                res.status(200).send(Category);
            }
            catch (error) {
                console.log(error);
                // apiErrorHandler(error, req, res, ` category doesn't exist`);
            }
            ;
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryId = req.params.id;
            try {
                const ParticularCategory = yield categoryService.findByCategoryId(categoryId);
                if (ParticularCategory !== null) {
                    res.status(200).send(ParticularCategory);
                }
            }
            catch (error) {
                res.status(401).send({ message: "category doesn't exist" });
                // apiErrorHandler(error, req, res, `Category ${req.params.id} is failed.`);
            }
            ;
        });
    }
    getQuestionsByCategoryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                categoryService.findQuestionsByCategoryId(req.params.category_id)
                    .then((data) => {
                    res.send(data);
                })
                    .catch((error) => {
                    res.send(error);
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getQuestionsByCategoryName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Category = yield categoryService.findByName(req.params.categoryname);
                var category_id = Category.id;
                categoryService.findQuestionsByCategoryName(category_id)
                    .then((data) => {
                    res.send(data);
                })
                    .catch((error) => {
                    res.send(error);
                });
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    getAllCategoryQuestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                categoryService.findAllCategoryQuestions()
                    .then((data) => {
                    res.send(data);
                })
                    .catch((error) => {
                    res.send(error);
                });
            }
            catch (error) {
                res.send(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
