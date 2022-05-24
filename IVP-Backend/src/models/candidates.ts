import { DataTypes, EnumDataType, Model, Optional } from 'sequelize';
import db from '../config/database'

interface CandidateAttributes {
    id: number;
    firstname: string;
    lastname:string;
    candidatecategoryid:number;
    email: string;
    phonenumber:number;
}

export interface CandidateOutput extends Required<CandidateAttributes> {}

export class Candidate extends Model implements CandidateAttributes {
    public  id!: number;
    public  firstname!: string;
    public  lastname!:string;
    public  candidatecategoryid!:number;
    public  email!: string;
    public  phonenumber!:number;
}

Candidate.init({
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true},
    firstName: {
      type: DataTypes.STRING,
      allowNull: false},
    lastName: {
        type: DataTypes.STRING,
        allowNull: false},
    candidateCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false},
    email: {
        type: DataTypes.STRING,
        allowNull: false},
    phoneNumber:{
        type:DataTypes.BIGINT,
        allowNull:true},
    },{
        sequelize: db,
        modelName: 'candidates',
        underscored : true,
        timestamps: true,
})