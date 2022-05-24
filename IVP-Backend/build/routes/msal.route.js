"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const msal_controller_1 = __importDefault(require("../controller/msal.controller"));
router.get('/', msal_controller_1.default.msalLogin);
router.get('/redirect', msal_controller_1.default.msalRedirect);
module.exports = router;
