import express, { Application, Request, Response } from 'express'
import db from './config/database';
const  router  = require( './routes/index');
const dbCreate = require('./models/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const isDev = process.env.NODE_ENV === 'development'
const app: Application = express();
const dotenv = require('dotenv');  
dotenv.config({ path: './env' });
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
import * as winston from 'winston';
const logger = require('./Handlers/errorHandlers');



/** Parse the request */
app.use(express.urlencoded({ extended: true }));
/** Takes care of JSON data */
app.use(express.json());

// app.use(cors("*"));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


// Setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

var corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  };
  app.use(cors(corsOptions));


app.use('/', router);



const start = async (): Promise<void> => {
    try {
      await db.sync({alter :true});
      app.listen(4000, () => {
        console.log("Server started on port 4000");
      });

    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  


  void start();