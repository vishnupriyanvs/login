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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const router = require('./routes/index');
const dbCreate = require('./models/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const isDev = process.env.NODE_ENV === 'development';
const app = (0, express_1.default)();
const dotenv = require('dotenv');
dotenv.config({ path: './env' });
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const logger = require('./Handlers/errorHandlers');
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: true }));
/** Takes care of JSON data */
app.use(express_1.default.json());
// app.use(cors("*"));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
// Setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
var corsOptions = {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
};
app.use(cors(corsOptions));
app.use('/', router);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.sync({ alter: true });
        app.listen(4000, () => {
            console.log("Server started on port 4000");
        });
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
void start();
