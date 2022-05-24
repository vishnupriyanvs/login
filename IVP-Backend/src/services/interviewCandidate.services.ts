var Sequelize = require('sequelize');
const Op = Sequelize.Op;
import { Interview } from "../models/interviews"
import { InterviewCandidates } from "../models/interviewCandidates";
import { Candidate } from "../models/candidates";
import db from "../config/database"

export class InterviewCandidateServices {


    createInterviewCandidateDetails(interviewCandidate: any) {
        var newInterviewCandidate = new Candidate(interviewCandidate);
        return newInterviewCandidate.save();
    }

    findInterviewCandidateDetails(interviewStatus: string) {
        return Interview.findAll({
            include: [{
                model: InterviewCandidates,
                attributes: ["candidateId", "interviewDate", "interviewTime", "interviewCandidateStatus"],
                include: [{
                    model: Candidate,
                    attributes: ["firstName", "lastName"]
                }],
                where: {
                    candidateId: {
                        [Op.ne]: null,
                    },
                    interviewCandidateStatus: interviewStatus
                }
            }],
            attributes: ["id", "interviewTitle"]
        })
    }

}