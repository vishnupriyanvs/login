import { Employee} from '../models/employees' 
import {Role} from '../models/roles';
/* class for providing employee services */
export class EmployeeService{
    
    static get EmployeeList(){
        /* When only selected fields required go for the below code */
        return ['name','id'];
      //  return ({});
    }


    /* To get the list of all employees*/
    getAllEmployees(){
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
        
                return Employee.findAll()  
    
    
            
    };


    /* To get a specific employee*/
    getEmployeeById(id : any){
        return Employee.findOne({
            where : {id : id},
            include :  [Role]
        })
    }

    getEmployeeByEmail(email : any){
        console.log("line-44-srvc")
        return Employee.findOne({
            where : {email : email},
            include :  [{model:Role,where: {role_name:"HR"}}]
        })
    }

    



    /* To update the roles of the employees*/
    updateEmployeeRoles(role_id : unknown, id : unknown){
        var updateEmployeeRoles = {
            role_id : role_id
        }
        return Employee.update(updateEmployeeRoles,{where : {id : id}});
    }


    
    /* To add/update/delete the unit access permission of employees to bridge table */
    async updateEmployeeAccess(access_given : any, id : any){
        this.getEmployeeById(id)
            .then((employee :any) => {
                try {
                    employee.setMaster_delivery_units(access_given)
                    return access_given
                } catch (error :any) {
                    return error
                } 
            })
           .catch((error) => {
               return error
           }) 
    }
    createEmployee(employee:any){
        var newEmployee = new Employee(employee);
        return newEmployee.save();
    }

}