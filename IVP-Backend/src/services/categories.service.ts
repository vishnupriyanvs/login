import { Category} from '../models/categories' 
import { Question} from '../models/questions' 


export class CategoryService{
    
    static get EmployeeList(){
        /* When only selected fields required go for the below code */
        //return ['id','role_id'];
        return ({});
    }


    /* To get the list of all categories*/
    getAllCategories(){
            return Category.findAll()   
    }

    createCategory(category:any){
        var newCategory = new Category(category);
        return newCategory.save();
    }

    findByCategoryId(id:string){
        return Category.findByPk(id);
    }

    findByName(name:any) {
        return Category.findOne({
            where:{
                categoryName:name
            }
        })
    }

    findQuestionsByCategoryId(id:string){
        return Question.findAll({
            where : {status:'active'},
            include : [{
                model : Category,
                where: { id : id}
                }],
        })
    }

    findQuestionsByCategoryName(id:number){
        return Question.findAll({
            include : [{
                model : Category,
                where: { id : id}
                }],
        })
    }
    findAllCategoryQuestions(){
        return Question.findAll({
            include : [{
                model : Category,
                }],
        })
    }


}