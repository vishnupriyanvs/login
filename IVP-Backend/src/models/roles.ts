import { DataTypes, EnumDataType, Model, Optional } from 'sequelize';
import db from '../config/database'

interface RolesAttributes {
    id: number;
    rolename: string;
}

export interface RoleOutput extends Required<RolesAttributes> {}

export class Role extends Model implements RolesAttributes {
    public  id!: number;
    public  rolename!: string;
}

Role.init({
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true},
    roleName: {
      type: DataTypes.STRING,
      allowNull: false},
   
    },{
        sequelize: db,
        modelName: 'roles',
        underscored : true,
        timestamps: true,
})