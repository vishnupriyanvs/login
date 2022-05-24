import { DataTypes, EnumDataType, Model, Optional } from 'sequelize';
import db from '../config/database'

interface EmployeeAttributes {
    id: number;
    firstname: string;
    lastname:string;
    email:string;
    roleid: number;
}

export interface EmployeeOutput extends Required<EmployeeAttributes> {}

export class Employee extends Model implements EmployeeAttributes {
    public  id!: number;
    public  firstname!: string;
    public  lastname!:string;
    public  email!: string;
    public  roleid!:number;
}

Employee.init({
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
    email: {
        type: DataTypes.STRING,
        allowNull: false},
    roleId:{
        type:DataTypes.INTEGER,
        allowNull:false},
    },{
        sequelize: db,
        modelName: 'employees',
        underscored : true,
        timestamps: true,
})