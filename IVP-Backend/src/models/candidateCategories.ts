import { DataTypes, EnumDataType, Model, Optional } from 'sequelize';
import db from '../config/database'

interface CandidateCategoriesAttributes {
    id: number;
    candidatecategoryname: string;
    createdbyid:number;
    updatedbyid:number;
}

export interface CandidateCategoryOutput extends Required<CandidateCategoriesAttributes> {}

export class CandidateCategory extends Model implements CandidateCategoriesAttributes {
    public id!: number
    public candidatecategoryname!: string
    public createdbyid!:number;
    public updatedbyid!:number;
}

CandidateCategory.init({
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true},
    candidateCategoryName: {
      type: DataTypes.STRING,
      allowNull: false},
    createdbyid:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    updatedbyid:{
        type: DataTypes.INTEGER,
        allowNull:true},
     },{
        sequelize: db,
        modelName: 'candidate_categories',
        underscored : true,
        timestamps: true,
})