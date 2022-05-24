import { Request, Response } from "express";
import { Json } from "sequelize/types/utils";
import { Role } from "../models/roles";
import { MasterInterface } from "../interfaces/intefaces"
import { RoleService } from "../services/roles.service";

const roleService = new RoleService();



export class RoleController {

    /* To get the list of all categories */
    async addRole(req: Request, res: Response) {
        try {
            let role: MasterInterface = req.body;
            const Role = await roleService.createRole(req.body)

            res.status(200).send(Role);

        }


        catch (error) {
            console.log(error);
        }
    }
}