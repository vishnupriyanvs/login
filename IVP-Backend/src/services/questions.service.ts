import { Question} from '../models/questions' 

interface EventInterface {
    question : string;
    status : string;
}

export class QuestionService{
    
    


    /* To get the list of all question*/
    getAllQuestions(){
            return Question.findAll({
            
        })   
    }

    createQuestion(question:any){
        var newQuestion = new Question(question);
        return newQuestion.save();
    }
    

    findByQuestionId(id:string){
        return Question.findByPk(id);
    }

   async updateQuestion(event:EventInterface,id:string){
        var updateQuestion = {
        question: event.question,
        status : event.status,
        }
    return Question.update(updateQuestion, { where: { id: id } })
    }
    

}