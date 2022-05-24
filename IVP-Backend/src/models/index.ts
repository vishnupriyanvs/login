import { Category } from "./categories";
import { Question } from "./questions";
import { Interview } from "./interviews";
import { Candidate } from "./candidates";
import { Employee } from "./employees";
import { Role } from "./roles";
import { CandidateCategory } from "./candidateCategories";
import { InterviewCandidates } from "./interviewCandidates";
import { InterviewQuestions } from "./interviewQuestions";
import { Module } from "module";

const sequelize = require('../config/database')
const db:any = {};
const Sequelize = require("sequelize");
db.Sequelize = Sequelize
db.sequelize = sequelize

db.Question=require('./questions')
db.Category=require("./categories")
db.Interview=require("./interviews")
db.Candidate=require("./candidates")
db.Employee=require("./employees")
db.Role=require("./roles")
db.CandidateCategory=require("./candidateCategories")
db.InterviewCandidates=require("./interviewCandidates")
db.InterviewQuestions=require("./interviewQuestions")




Question.belongsTo(Category, {foreignKey: 'category_id'});
Category.hasMany(Question, {foreignKey: 'category_id'});

Employee.belongsTo(Role,{foreignKey:'role_id'});
Role.hasMany(Employee,{foreignKey:'role_id'});
Candidate.belongsTo(CandidateCategory, {foreignKey: 'candidate_category_id'});
CandidateCategory.hasMany(Candidate, {foreignKey: 'candidate_category_id'});

InterviewCandidates.belongsTo(Interview,{foreignKey:'interview_id'});
Interview.hasOne(InterviewCandidates, {foreignKey:'interview_id'});

InterviewCandidates.belongsTo(Candidate,{foreignKey:'candidate_id'});
Candidate.hasOne(InterviewCandidates, {foreignKey:'candidate_id'});

InterviewQuestions.belongsTo(Question,{foreignKey:'question_id'});
Question.hasOne(InterviewQuestions, {foreignKey:'question_id'});

InterviewQuestions.belongsTo(Interview, {foreignKey: 'interview_id'});
Interview.hasMany(InterviewQuestions, {foreignKey: 'interview_id'});

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

module.exports=db;