import { EmployeeService } from "../../services/employees.services";
const msal = require('@azure/msal-node');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const url = require('url');

const employeeService = new EmployeeService();

var msalController = {
    msalLogin: msalLogin,
    msalRedirect: msalRedirect
}

var tokenList = [];

const config = {
    auth: {
        clientId: "508ff090-b3fb-4605-acb0-b85e98ca6852",
        authority: "https://login.microsoftonline.com/13ec0e67-00c5-44c4-8bdb-52adb4a2feae/",
        clientSecret: "6f302778-6339-490a-a09f-1440a45442ad",
        redirectUri: "http://localhost:4000/microsoft-login/redirect"
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
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/microsoft-login/redirect",
    };

    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response: any) => {
        res.redirect(response);
    }).catch((error: any) => {
        console.log(JSON.stringify(error))
    });
}
async function msalRedirect(req: any, res: any) {

    var token;
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/microsoft-login/redirect",
    };

    cca.acquireTokenByCode(tokenRequest).then((response: any) => {
        token = response.accessToken;
        console.log('------when login------')
        console.log(token);
        const decodedMsal = jwt.decode(token, async (err: any, data: any) => {
            if (err) return res.status(403).send({ message: "Token Expired" })
            return data
        })
        console.log(decodedMsal.unique_name);

        employeeService.getEmployeeByEmail(decodedMsal.unique_name).
            then((data: any) => {
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
                tokenList[refreshToken] = response;
                res.redirect(url.format({
                    pathname: "http://localhost:3000/",
                    query: {
                        "accessToken": accessToken,
                        "refreshToken": refreshToken,
                        "role": data.role.name,
                        "id": data.id,
                        "name": data.name,
                        "msal": true
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

