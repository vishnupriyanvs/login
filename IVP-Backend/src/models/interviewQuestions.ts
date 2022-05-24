import { DataTypes, EnumDataType, Model, Optional } from 'sequelize';
import db from '../config/database'

interface InterviewQuestionsAttributes {
    id: number;
    questionid: number;
    interviewid: number;
}

export interface  InterviewQuestionsOutput extends Required< InterviewQuestionsAttributes> {}

export class  InterviewQuestions extends Model implements  InterviewQuestionsAttributes {
    public id!: number
    public questionid!: number;
    public interviewid!: number;
}

InterviewQuestions.init({
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true},
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: true},
    interviewId: {
        type: DataTypes.INTEGER,
        allowNull: false},
    },{
        sequelize: db,
        modelName: 'interview_questions',
        underscored : true,
        timestamps: true,
})