import { Role} from '../models/roles' 
// import { Question} from '../models/questions' 


export class RoleService{
    
    static get EmployeeList(){
        /* When only selected fields required go for the below code */
        //return ['id','role_id'];
        return ({});
    }


    /* To get the list of all categories*/
   

    createRole(role:any){
        var newRole = new Role(role);
        return newRole.save();
    }
}