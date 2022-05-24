"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const employees_controller_1 = require("../controller/employees.controller");
const employeeController = new employees_controller_1.EmployeeController();
//for getting list of all categories
router.post('/employee', employeeController.addEmployee);
router.get('/employees', employeeController.getEmployeeList);
router.get('/employees/:id', employeeController.getEmployeeById);
router.get('/employeesemail/:email', employeeController.getEmployeeByEmail);
// router.get('/employeesemail',employeeController.getEmployeeByEmail);
// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
// router.post('/categories',categoryController.addCategory);
module.exports = router;
