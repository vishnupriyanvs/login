"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewCandidateServices = void 0;
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const interviews_1 = require("../models/interviews");
const interviewCandidates_1 = require("../models/interviewCandidates");
const candidates_1 = require("../models/candidates");
class InterviewCandidateServices {
    createInterviewCandidateDetails(interviewCandidate) {
        var newInterviewCandidate = new candidates_1.Candidate(interviewCandidate);
        return newInterviewCandidate.save();
    }
    findInterviewCandidateDetails(interviewStatus) {
        return interviews_1.Interview.findAll({
            include: [{
                    model: interviewCandidates_1.InterviewCandidates,
                    attributes: ["candidateId", "interviewDate", "interviewTime", "interviewCandidateStatus"],
                    include: [{
                            model: candidates_1.Candidate,
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
        });
    }
}
exports.InterviewCandidateServices = InterviewCandidateServices;
