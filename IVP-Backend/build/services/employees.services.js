"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const employees_1 = require("../models/employees");
const roles_1 = require("../models/roles");
/* class for providing employee services */
class EmployeeService {
    static get EmployeeList() {
        /* When only selected fields required go for the below code */
        return ['name', 'id'];
        //  return ({});
    }
    /* To get the list of all employees*/
    getAllEmployees() {
        /* When only selected fields required go for the below code */
        //  return Employee.findAll({
        //      attributes:EmployeeService.EmployeeList
        // }) 
        // return Employee.findAll({
        //    include :  [Role, Designation,Grade
        //     through: {
        //         attributes: ['name'],
        //         where : {completed : true}
        // }
        //]
        return employees_1.Employee.findAll();
    }
    ;
    /* To get a specific employee*/
    getEmployeeById(id) {
        return employees_1.Employee.findOne({
            where: { id: id },
            include: [roles_1.Role]
        });
    }
    getEmployeeByEmail(email) {
        console.log("line-44-srvc");
        return employees_1.Employee.findOne({
            where: { email: email },
            include: [{ model: roles_1.Role, where: { role_name: "HR" } }]
        });
    }
    /* To update the roles of the employees*/
    updateEmployeeRoles(role_id, id) {
        var updateEmployeeRoles = {
            role_id: role_id
        };
        return employees_1.Employee.update(updateEmployeeRoles, { where: { id: id } });
    }
    /* To add/update/delete the unit access permission of employees to bridge table */
    updateEmployeeAccess(access_given, id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getEmployeeById(id)
                .then((employee) => {
                try {
                    employee.setMaster_delivery_units(access_given);
                    return access_given;
                }
                catch (error) {
                    return error;
                }
            })
                .catch((error) => {
                return error;
            });
        });
    }
    createEmployee(employee) {
        var newEmployee = new employees_1.Employee(employee);
        return newEmployee.save();
    }
}
exports.EmployeeService = EmployeeService;
