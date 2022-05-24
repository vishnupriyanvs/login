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
exports.QuestionController = void 0;
const questions_service_1 = require("../services/questions.service");
const categories_service_1 = require("../services/categories.service");
const questionService = new questions_service_1.QuestionService();
const categoriesService = new categories_service_1.CategoryService();
class QuestionController {
    /* To get the list of all categories */
    getAllQuestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AllQuestions = yield questionService.getAllQuestions();
                res
                    .status(200)
                    .send({ AllQuestions });
            }
            catch (error) {
                res.status(401).send({ message: "questions doesn't exist" });
                // apiErrorHandler(error, req, res, 'Fetch All Question failed.');
            }
        });
    }
    /* To add question */
    addQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield categoriesService.findByName(req.body.categoryName);
                let QuestionDb = {
                    question: req.body.question,
                    status: req.body.status,
                    category_id: category === null || category === void 0 ? void 0 : category.id,
                };
                questionService
                    .createQuestion(QuestionDb)
                    .then((data) => {
                    res.status(200).send(data);
                })
                    .catch((error) => {
                    console.log(error);
                });
            }
            catch (error) {
                res.status(401).send({ message: "Category does not exist" });
                // apiErrorHandler(error, req, res, ` category doesn't exist`);
            }
        });
    }
    /* To get question by particular id */
    getQuestionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let questionId = req.params.id;
            try {
                const ParticularQuestion = yield questionService.findByQuestionId(questionId);
                console.log(ParticularQuestion);
                if (ParticularQuestion !== null) {
                    res.status(200).send(ParticularQuestion);
                }
            }
            catch (error) {
                res.status(401).send({ message: "questions doesn't exist" });
                // apiErrorHandler(error, req, res, `Question ${req.params.id} is failed.`);
            }
        });
    }
    /* To update particular question */
    updateQuestionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateQuestion = yield questionService.updateQuestion(req.body, req.params.id);
                res
                    .status(200)
                    .json(updateQuestion);
            }
            catch (error) {
                res.status(401).send({ message: "questions doesn't update" });
                // apiErrorHandler(error, req, res, `Question ${req.params.id} is not updated.`);
            }
        });
    }
}
exports.QuestionController = QuestionController;
