"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const roles_1 = require("../models/roles");
// import { Question} from '../models/questions' 
class RoleService {
    static get EmployeeList() {
        /* When only selected fields required go for the below code */
        //return ['id','role_id'];
        return ({});
    }
    /* To get the list of all categories*/
    createRole(role) {
        var newRole = new roles_1.Role(role);
        return newRole.save();
    }
}
exports.RoleService = RoleService;
