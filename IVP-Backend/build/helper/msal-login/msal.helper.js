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
const employees_services_1 = require("../../services/employees.services");
const msal = require('@azure/msal-node');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const url = require('url');
const employeeService = new employees_services_1.EmployeeService();
var msalController = {
    msalLogin: msalLogin,
    msalRedirect: msalRedirect
};
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
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};
const cca = new msal.ConfidentialClientApplication(config);
function msalLogin(req, res) {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:4000/microsoft-login/redirect",
    };
    // get url to sign user in and consent to scopes needed for application
    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
        res.redirect(response);
    }).catch((error) => {
        console.log(JSON.stringify(error));
    });
}
function msalRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var token;
        const tokenRequest = {
            code: req.query.code,
            scopes: ["user.read"],
            redirectUri: "http://localhost:4000/microsoft-login/redirect",
        };
        cca.acquireTokenByCode(tokenRequest).then((response) => {
            token = response.accessToken;
            console.log('------when login------');
            console.log(token);
            const decodedMsal = jwt.decode(token, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.status(403).send({ message: "Token Expired" });
                return data;
            }));
            console.log(decodedMsal.unique_name);
            employeeService.getEmployeeByEmail(decodedMsal.unique_name).
                then((data) => {
                const accessToken = jwt.sign({ id: data.id }, process.env.ACCESS_TOKEN_SECRET_KEY, {
                    expiresIn: '20min'
                });
                var expiresIn = '3h';
                const refreshToken = jwt.sign({ id: data.id }, process.env.REFRESH_TOKEN_SECRET_KEY, {
                    expiresIn: '3h'
                });
                const response = {
                    "accessToken": accessToken,
                    "refreshToken": refreshToken
                };
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
                }));
                ;
            })
                .catch((error) => {
                console.log(error);
                return res.status(404).send('User not found');
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
    });
}
exports.default = msalController;
