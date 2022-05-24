"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("./categories");
const questions_1 = require("./questions");
const interviews_1 = require("./interviews");
const candidates_1 = require("./candidates");
const employees_1 = require("./employees");
const roles_1 = require("./roles");
const candidateCategories_1 = require("./candidateCategories");
const interviewCandidates_1 = require("./interviewCandidates");
const interviewQuestions_1 = require("./interviewQuestions");
const sequelize = require('../config/database');
const db = {};
const Sequelize = require("sequelize");
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Question = require('./questions');
db.Category = require("./categories");
db.Interview = require("./interviews");
db.Candidate = require("./candidates");
db.Employee = require("./employees");
db.Role = require("./roles");
db.CandidateCategory = require("./candidateCategories");
db.InterviewCandidates = require("./interviewCandidates");
db.InterviewQuestions = require("./interviewQuestions");
questions_1.Question.belongsTo(categories_1.Category, { foreignKey: 'category_id' });
categories_1.Category.hasMany(questions_1.Question, { foreignKey: 'category_id' });
employees_1.Employee.belongsTo(roles_1.Role, { foreignKey: 'role_id' });
roles_1.Role.hasMany(employees_1.Employee, { foreignKey: 'role_id' });
candidates_1.Candidate.belongsTo(candidateCategories_1.CandidateCategory, { foreignKey: 'candidate_category_id' });
candidateCategories_1.CandidateCategory.hasMany(candidates_1.Candidate, { foreignKey: 'candidate_category_id' });
interviewCandidates_1.InterviewCandidates.belongsTo(interviews_1.Interview, { foreignKey: 'interview_id' });
interviews_1.Interview.hasOne(interviewCandidates_1.InterviewCandidates, { foreignKey: 'interview_id' });
interviewCandidates_1.InterviewCandidates.belongsTo(candidates_1.Candidate, { foreignKey: 'candidate_id' });
candidates_1.Candidate.hasOne(interviewCandidates_1.InterviewCandidates, { foreignKey: 'candidate_id' });
interviewQuestions_1.InterviewQuestions.belongsTo(questions_1.Question, { foreignKey: 'question_id' });
questions_1.Question.hasOne(interviewQuestions_1.InterviewQuestions, { foreignKey: 'question_id' });
interviewQuestions_1.InterviewQuestions.belongsTo(interviews_1.Interview, { foreignKey: 'interview_id' });
interviews_1.Interview.hasMany(interviewQuestions_1.InterviewQuestions, { foreignKey: 'interview_id' });
// Question.belongsToMany(Interview, {
//     through: "interview_questions",
//     foreignKey: "question_id",
//     otherKey: "interview_id"
//   });
//   Interview.belongsToMany(Question, {
//     through: "interview_questions",
//     foreignKey: "interview_id",
//     otherKey: "question_id" ,
//   });
module.exports = db;
