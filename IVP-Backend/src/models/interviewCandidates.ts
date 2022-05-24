import { DataTypes, EnumDataType, Model, Optional } from 'sequelize';
import db from '../config/database'

interface InterviewCandidatesAttributes {
    id: number;
    candidateid: number;
    interviewid: number;
    interviewdate:Date;
    interviewtime:Date;
    requestlink: string;
    requestlinkstatus: EnumDataType<any>;
    interviewCandidateStatus:EnumDataType<any>;
}

export interface CandidateCategoryOutput extends Required<InterviewCandidatesAttributes> {}

export class InterviewCandidates extends Model implements InterviewCandidatesAttributes {
    public id!: number
    public candidateid!: number
    public interviewid!: number
    public interviewdate!:Date
    public interviewtime!:Date
    public requestlink!: string
    public requestlinkstatus!: EnumDataType<any>;
    public interviewCandidateStatus!:EnumDataType<any>;
}

InterviewCandidates.init({
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true},
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false},
    interviewId: {
        type: DataTypes.INTEGER,
        allowNull: false},
    interviewDate: {
        type: DataTypes.DATE,
        allowNull: true},
    interviewTime: {
        type: DataTypes.TIME,
        allowNull: true},
    requestLink: {
        type: DataTypes.STRING,
        allowNull: true},
    requestLinkStatus:{
        type:DataTypes.STRING,
        values:['active','in active'],
            // validate: {
            //   customValidator: (value:string) => {
            //       const enums = ['active', 'inactive']
            //       if (!enums.includes(value)) {
            //           throw new Error('not a valid option')
            //       }
            //   }
          // },
        allowNull:true},
        interviewCandidateStatus:{
            type:DataTypes.STRING,
            values:['In progress','Completed','Not started'],
                // validate: {
                //   customValidator: (value:string) => {
                //       const enums = ['active', 'inactive']
                //       if (!enums.includes(value)) {
                //           throw new Error('not a valid option')
                //       }
                //   }
              // },
            allowNull:true},
    },{
        sequelize: db,
        modelName: 'interview_candidates',
        underscored : true,
        timestamps: true,
})