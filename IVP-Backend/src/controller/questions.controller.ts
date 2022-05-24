import { Request, Response } from "express";
import { Question } from "../models/questions";
import { QuestionService } from "../services/questions.service";
import { CategoryService } from "../services/categories.service";
// import { apiErrorHandler } from '../Handlers/errorHandlers';
import { QuestionInterface } from "../interfaces/intefaces";

const questionService = new QuestionService();
const categoriesService = new CategoryService();



export class QuestionController {
  /* To get the list of all categories */
  async getAllQuestions(req: Request, res: Response) {
    try {
      const AllQuestions = await questionService.getAllQuestions();
      res
        .status(200)
        .send({ AllQuestions });
    } catch (error){
      res.status(401).send({ message: "questions doesn't exist" });
      // apiErrorHandler(error, req, res, 'Fetch All Question failed.');
    }
  }


  /* To add question */
  async addQuestion(req: Request, res: Response) {
    try {
      const category = await categoriesService.findByName(
        req.body.categoryName
      );
      let QuestionDb: QuestionInterface = {
        question: req.body.question,
        status: req.body.status,
        category_id: category?.id,
      };
      questionService
        .createQuestion(QuestionDb)
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch(error){
      res.status(401).send({ message: "Category does not exist" });
      // apiErrorHandler(error, req, res, ` category doesn't exist`);

    }
  }

  
  /* To get question by particular id */
  async getQuestionById(req: Request, res: Response) {
    let questionId: string = req.params.id;
    try {
      const ParticularQuestion: Question | null =
        await questionService.findByQuestionId(questionId);
      console.log(ParticularQuestion);

      if (ParticularQuestion !== null) {
        res.status(200).send(
          ParticularQuestion
        );
      }
    } catch (error) {
      res.status(401).send({ message: "questions doesn't exist" });
      // apiErrorHandler(error, req, res, `Question ${req.params.id} is failed.`);
    }
  }

  /* To update particular question */
  async updateQuestionById(req: Request, res: Response) {
    try {
      const updateQuestion = await questionService.updateQuestion(
        req.body,
        req.params.id
      );
      res
        .status(200)
        .json(updateQuestion);
    } catch (error){
      res.status(401).send({ message: "questions doesn't update" });
      // apiErrorHandler(error, req, res, `Question ${req.params.id} is not updated.`);

    }
  }
}
