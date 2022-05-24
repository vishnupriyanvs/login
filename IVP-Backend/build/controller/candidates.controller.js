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
exports.CandidateController = void 0;
const candidates_services_1 = require("../services/candidates.services");
const candidateService = new candidates_services_1.CandidateService();
class CandidateController {
    /* To get the list of all categories */
    getCandidateList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            candidateService.getAllCandidates()
                .then((data) => {
                if (Object.keys(data).length !== 0)
                    res.status(200).send({ message: "candidate retrieved successfully", data });
                else
                    res.status(401).send({ message: "candidate table is empty" });
            })
                .catch((error) => {
                res.status(401).send(error);
            });
        });
    }
    addCandidate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let candidate = req.body;
            candidateService.createCandidate(candidate)
                .then((data) => {
                res.status(200).send({ message: "candidate created", data });
            })
                .catch((error) => {
                console.log(error);
            });
        });
    }
    getCandidateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let candidateId = req.params.id;
            candidateService.findByCandidateId(candidateId)
                .then((data) => {
                if (data.data !== 'null') {
                    res.status(200).send({ message: "particular candidate retrieved successfully", data });
                }
            })
                .catch((error) => {
                res.status(401).send({ message: "candidate doesn't exist" });
            });
        });
    }
}
exports.CandidateController = CandidateController;
