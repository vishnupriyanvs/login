"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateCategory = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class CandidateCategory extends sequelize_1.Model {
}
exports.CandidateCategory = CandidateCategory;
CandidateCategory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    candidateCategoryName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    createdbyid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    updatedbyid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
}, {
    sequelize: database_1.default,
    modelName: 'candidate_categories',
    underscored: true,
    timestamps: true,
});
