import { Json } from "sequelize/types/utils";
import { Interview } from "../models/interviews";
import { CandidateService } from "../services/candidates.services";

const candidateService = new CandidateService();

export class CandidateController{

    /* To get the list of all categories */
    async getCandidateList(req:any,res:any){
        candidateService.getAllCandidates()
            .then((data:any)=>{
                
                    if(Object.keys(data).length !== 0)
                        res.status(200).send({message:"candidate retrieved successfully",data});
                    else
                        res.status(401).send({message: "candidate table is empty"})
            })
            .catch((error:string) => {
                res.status(401).send(error)
    });
    }

    async addCandidate(req:any,res:any){
        let candidate:any = req.body;
        candidateService.createCandidate(candidate)
            .then((data:any)=>{
                res.status(200).send({message:"candidate created",data});
        })
            .catch((error:string) => {
            console.log(error);
});
    }

     async getCandidateById(req:any,res:any){
        let candidateId:number = req.params.id;
        candidateService.findByCandidateId(candidateId)
            .then((data:any)=>{
                if(data.data !== 'null'){
                res.status(200).send({message:"particular candidate retrieved successfully",data});
                }
            })
            .catch((error:string) => {
                res.status(401).send({message: "candidate doesn't exist"})
                
            });
    }
}