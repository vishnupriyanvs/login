import { EmployeeService } from "../services/employees.services";
const msal = require('@azure/msal-node');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const url = require('url');

const employeeService = new EmployeeService();

var msalController = {
    msalLogin: msalLogin,
    msalRedirect: msalRedirect
}

var tokenList:any = [];

const config = {
    auth: {
        clientId:  "ea6c0ef1-d219-4356-b8b5-b15ce28c13ea",
        authority:  "https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae/",
        clientSecret: "32k8Q~u0AhFvvZ.rIt9Q1vyXPw51MLNtPPyy7aCF",
        // redirectUri: "http://localhost:3000/tile"
        redirectUri:  "http://localhost:4000/microsoft-login/redirect",
        // knownAuthorities: ["https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae"]
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel: any, message: any, containsPii: any) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};
const cca = new msal.ConfidentialClientApplication(config);

function msalLogin(req: any, res: any) {
    console.log("line-36")
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        // redirectUri: "http://localhost:3000/tile",
        redirectUri: "http://localhost:4000/microsoft-login/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response: any) => {
        console.log("line-44")
        res.redirect(response);
    }).catch((error: any) => {
        console.log(JSON.stringify(error))
    });
}
async function msalRedirect(req: any, res: any) {

    var token;
    console.log("line-53")
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
         redirectUri: "http://localhost:3000",
         knownAuthorities: ["https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae"]
        //redirectUri: "http://localhost:3000/tile"
    };

    cca.acquireTokenByCode(tokenRequest).then((response: any) => {
        console.log("line-62")
        token = response.accessToken;
        console.log('------when login------')
        console.log(token);
        const decodedMsal = jwt.decode(token, async (err: any, data: any) => {
            if (err) return res.status(403).send({ message: "Token Expired" })
            return data
        })
        console.log("line-70")
        console.log(decodedMsal.unique_name);

        employeeService.getEmployeeByEmail(decodedMsal.unique_name).
            then((data: any) => {
                console.log("line-74")
                const accessToken = jwt.sign({ id: data.id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                    
                    expiresIn: '20min'
                });
                var expiresIn = '3h'
                const refreshToken = jwt.sign({ id: data.id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
                    expiresIn: '3h'
                });

                const response = {
                    "accessToken": accessToken,
                    "refreshToken": refreshToken
                }
                tokenList[refreshToken]= response;
                console.log(tokenList)

                // res.status(200).send({

                //     "user": data,

                //     "accessToken": accessToken,

                //     "refreshToken": refreshToken,

                //     "expires_in": expiresIn

                // })

                console.log(data.name)
                res.redirect(url.format({
                    pathname: "http://localhost:3000/login",
                    query: {
                        "accessToken": accessToken,
                        "refreshToken": refreshToken,
                        "role": data.role.roleName,
                        "id": data.id,
                        "name": data.firstName,
                         //"msal": true
                    }
                }));;


            })
            .catch((error) => {
                console.log(error);
                return res.status(404).send('User not found');
            });


    }).catch((error: any) => {
        console.log(error);
        res.status(500).send(error);
    });

}

export default msalController

