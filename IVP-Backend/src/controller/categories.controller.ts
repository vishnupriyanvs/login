import { Request, Response } from "express";
import { Category } from "../models/categories";
import { CategoryService } from "../services/categories.service";
// import { apiErrorHandler } from '../Handlers/errorHandlers';
import { MasterInterface } from "../interfaces/intefaces";


const categoryService = new CategoryService();


export class CategoryController {

    /* To get the list of all categories */
    async getCategoryList(req: Request, res: Response) {
        try {
            const AllCategories = await categoryService.getAllCategories();
            res.status(200).send(AllCategories);

        }

        catch (error) {
            res.status(401).send(error)
            // apiErrorHandler(error, req, res, 'Fetch All Categories failed.');

        };
    }

    async addCategory(req: Request, res: Response) {
        try {
            let category: MasterInterface = req.body;
            const Category = await categoryService.createCategory(category)
            res.status(200).send(Category);
        }

        catch (error) {
            console.log(error);
            // apiErrorHandler(error, req, res, ` category doesn't exist`);


        };
    }

    async getCategoryById(req: Request, res: Response) {
        let categoryId: string = req.params.id;
        try {
            const ParticularCategory: Category | null = await categoryService.findByCategoryId(categoryId)

            if (ParticularCategory !== null) {
                res.status(200).send(ParticularCategory);
            }
        }
        catch (error) {
            res.status(401).send({ message: "category doesn't exist" })
            // apiErrorHandler(error, req, res, `Category ${req.params.id} is failed.`);

        };
    }



    async getQuestionsByCategoryId(req: Request, res: Response) {
        try {
            categoryService.findQuestionsByCategoryId(req.params.category_id)
                .then((data) => {
                    res.send(data)
                })
                .catch((error) => {
                    res.send(error)
                })
        }
        catch (error) {
            console.log(error);
        }
    }

    async getQuestionsByCategoryName(req: Request, res: Response) {
        try {
            const Category: any = await categoryService.findByName(req.params.categoryname)
            var category_id = Category.id;

            categoryService.findQuestionsByCategoryName(category_id)
                .then((data) => {
                    res.send(data)
                })
                .catch((error) => {
                    res.send(error)
                })


        }
        catch (error) {
            res.send(error)
        }
    }

    async getAllCategoryQuestions(req: Request, res: Response) {
        try {
            

            categoryService.findAllCategoryQuestions()
                .then((data) => {
                    res.send(data)
                })
                .catch((error) => {
                    res.send(error)
                })


        }
        catch (error) {
            res.send(error)
        }
    }


   
}