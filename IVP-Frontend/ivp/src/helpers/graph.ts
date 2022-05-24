import jwt from 'jwt-decode'

export function callMsGraph(accessToken:any):any {

    const user:any = jwt(accessToken);

    console.log(user.unique_name);

    return user.unique_name

}