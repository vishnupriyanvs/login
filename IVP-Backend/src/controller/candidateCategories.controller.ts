import { Json } from "sequelize/types/utils";
import { CandidateCategory } from "../models/candidateCategories";
import { CandidateCategoryService } from "../services/candidateCategories.service";

const categoryService = new CandidateCategoryService();



export class CandidateCategoryController{

    /* To get the list of all categories */
    async getCategoryList(req:any,res:any){
        categoryService.getAllCategories()
            .then((data:any)=>{
                if(Object.keys(data).length !== 0)
                    res.status(200).send({message:"category retrieved successfully",data});
                else
                res.status(401).send({message: "category doesn't exist"})
            })
            .catch((error:string) => {
                res.status(401).send(error)
            });
    }

    async addCategory(req:any,res:any){
        let category:any = req.body;
        console.log(category)
        categoryService.createCategory(category)
            .then((data:any)=>{
                res.status(200).send({message:"category created",data});
        })
            .catch((error:string) => {
            console.log(error);
});
    }

     async getCategoryById(req:any,res:any){
        let categoryId:number = req.params.id;
        categoryService.findByCategoryId(categoryId)
            .then((data:any)=>{
                if(data.data !== 'null'){
                res.status(200).send({message:"particular category retrieved successfully",data});
                }
            })
            .catch((error:string) => {
                res.status(401).send({message: "category doesn't exist"})
                
            });
    }
    
}