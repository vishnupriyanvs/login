import { Router } from 'express'
const router = Router()


import { RoleController } from '../controller/roles.controller';

const roleController = new RoleController();

// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
router.post('/roles',roleController.addRole);


module.exports = router