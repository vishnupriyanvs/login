"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Question extends sequelize_1.Model {
}
exports.Question = Question;
Question.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        // values:['active','in active'],
        validate: {
            customValidator: (value) => {
                const enums = ['active', 'in active'];
                if (!enums.includes(value)) {
                    throw new Error('not a valid option');
                }
            }
        },
        allowNull: false
    },
}, {
    sequelize: database_1.default,
    modelName: 'questions',
    underscored: true,
    timestamps: true,
});
