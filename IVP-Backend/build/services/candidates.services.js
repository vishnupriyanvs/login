"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateService = void 0;
const candidates_1 = require("../models/candidates");
class CandidateService {
    static get EmployeeList() {
        /* When only selected fields required go for the below code */
        //return ['id','role_id'];
        return ({});
    }
    /* To get the list of all candidates*/
    getAllCandidates() {
        return candidates_1.Candidate.findAll();
    }
    createCandidate(category) {
        var newCandidate = new candidates_1.Candidate(category);
        return newCandidate.save();
    }
    findByCandidateId(id) {
        return candidates_1.Candidate.findByPk(id);
    }
}
exports.CandidateService = CandidateService;
