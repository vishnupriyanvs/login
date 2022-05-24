import { Candidate } from '../models/candidates' 

export class CandidateService{
    
    static get EmployeeList(){
        /* When only selected fields required go for the below code */
        //return ['id','role_id'];
        return ({});
    }


    /* To get the list of all candidates*/
    getAllCandidates(){
            return Candidate.findAll()   
    }

    createCandidate(category:any){
        var newCandidate = new Candidate(category);
        return newCandidate.save();
    }

    findByCandidateId(id:number){
        return Candidate.findByPk(id);
    }
}