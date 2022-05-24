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
exports.CandidateCategoryController = void 0;
const candidateCategories_service_1 = require("../services/candidateCategories.service");
const categoryService = new candidateCategories_service_1.CandidateCategoryService();
class CandidateCategoryController {
    /* To get the list of all categories */
    getCategoryList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            categoryService.getAllCategories()
                .then((data) => {
                if (Object.keys(data).length !== 0)
                    res.status(200).send({ message: "category retrieved successfully", data });
                else
                    res.status(401).send({ message: "category doesn't exist" });
            })
                .catch((error) => {
                res.status(401).send(error);
            });
        });
    }
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let category = req.body;
            console.log(category);
            categoryService.createCategory(category)
                .then((data) => {
                res.status(200).send({ message: "category created", data });
            })
                .catch((error) => {
                console.log(error);
            });
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryId = req.params.id;
            categoryService.findByCategoryId(categoryId)
                .then((data) => {
                if (data.data !== 'null') {
                    res.status(200).send({ message: "particular category retrieved successfully", data });
                }
            })
                .catch((error) => {
                res.status(401).send({ message: "category doesn't exist" });
            });
        });
    }
}
exports.CandidateCategoryController = CandidateCategoryController;
