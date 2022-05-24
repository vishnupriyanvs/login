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
exports.RoleController = void 0;
const roles_service_1 = require("../services/roles.service");
const roleService = new roles_service_1.RoleService();
class RoleController {
    /* To get the list of all categories */
    addRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role = req.body;
                const Role = yield roleService.createRole(req.body);
                res.status(200).send(Role);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.RoleController = RoleController;
