import { Router } from 'express'
const router = Router()
import { EmployeeController } from '../controller/employees.controller';

const employeeController = new EmployeeController();

//for getting list of all categories
router.post('/employee',employeeController.addEmployee);
router.get('/employees',employeeController.getEmployeeList);
router.get('/employees/:id',employeeController.getEmployeeById);
router.get('/employeesemail/:email',employeeController.getEmployeeByEmail);

// router.get('/employeesemail',employeeController.getEmployeeByEmail);
// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
// router.post('/categories',categoryController.addCategory);


module.exports = router