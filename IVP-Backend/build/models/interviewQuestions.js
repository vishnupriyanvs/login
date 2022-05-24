"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewQuestions = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class InterviewQuestions extends sequelize_1.Model {
}
exports.InterviewQuestions = InterviewQuestions;
InterviewQuestions.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    interviewId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: database_1.default,
    modelName: 'interview_questions',
    underscored: true,
    timestamps: true,
});
