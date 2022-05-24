"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewCandidateController = void 0;
const interviewCandidate_services_1 = require("../services/interviewCandidate.services");
const interviewCandidateServices = new interviewCandidate_services_1.InterviewCandidateServices();
class InterviewCandidateController {
    addInterviewCandidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const InterviewCandidates = yield interviewCandidateServices.createInterviewCandidateDetails(req.body);
                res
                    .status(200)
                    .send(InterviewCandidates);
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    getInterviewCandidateDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const AllInterviewCandidates = yield interviewCandidateServices.findInterviewCandidateDetails(req.params.interviewStatus);
                res
                    .status(200)
                    .send(AllInterviewCandidates);
            }
            catch (error) {
                res.status(401).send({ message: "interview deatils doesn't exists" });
                // apiErrorHandler(error, req, res, 'Fetch All Question failed.');
            }
        });
    }
}
exports.InterviewCandidateController = InterviewCandidateController;
