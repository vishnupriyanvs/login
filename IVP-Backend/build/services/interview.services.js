"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewService = void 0;
const interviews_1 = require("../models/interviews");
class InterviewService {
    createInterview(interview) {
        var newInterview = new interviews_1.Interview(interview);
        return newInterview.save();
    }
    findByTitle(title) {
        return interviews_1.Interview.findOne({
            where: {
                interviewTitle: title
            }
        });
    }
    findByStatus(status) {
        return interviews_1.Interview.findAll({
            where: {
                status: status
            }
        });
    }
    findAllInterviews() {
        return interviews_1.Interview.findAll();
    }
    updateInterview(interview, interview_id) {
        var interviewTitle = interview.interviewTitle;
        var interviewStatus = interview.status;
        var updateInterview = {
            interviewTitle: interviewTitle,
            status: interviewStatus
        };
        return interviews_1.Interview.update(updateInterview, { where: { id: interview_id } });
    }
}
exports.InterviewService = InterviewService;
