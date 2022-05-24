"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const roles_controller_1 = require("../controller/roles.controller");
const roleController = new roles_controller_1.RoleController();
// router.put('/update-employee-role/:id',categoryController.updateEmployeeRoles);
router.post('/roles', roleController.addRole);
module.exports = router;
