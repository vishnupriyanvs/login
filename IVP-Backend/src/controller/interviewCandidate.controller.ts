import { Request, Response } from "express";
import {InterviewCandidateServices} from "../services/interviewCandidate.services"

const interviewCandidateServices = new InterviewCandidateServices();

export class InterviewCandidateController{

    async addInterviewCandidate(req: Request, res: Response){
        try{
            const InterviewCandidates = await interviewCandidateServices.createInterviewCandidateDetails(req.body);
            res
            .status(200)
            .send(InterviewCandidates);
        }catch(error){
          res.send(error)
        }
    }

    async getInterviewCandidateDetails(req: Request, res: Response) {
        try {
          const AllInterviewCandidates = await interviewCandidateServices.findInterviewCandidateDetails(req.params.interviewStatus);
          res
            .status(200)
            .send(AllInterviewCandidates);
        } catch (error){
          res.status(401).send({ message: "interview deatils doesn't exists" });
          // apiErrorHandler(error, req, res, 'Fetch All Question failed.');
        }
      }
}