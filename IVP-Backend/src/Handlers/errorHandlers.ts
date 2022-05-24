import { Request, Response, NextFunction } from 'express';
// import * as winston from 'winston';
const { createLogger, format, transports, config } = require('winston');

// const file = new winston.transports.File({
//     filename: '../logs/error.log',
//     level: 'error',
//     handleExceptions: true,
//   });

module.exports = createLogger({

  transports:
  
      new transports.File({
  
      filename: 'logs/server.log',
  
      format:format.combine(
  
          format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
  
          format.align(),
  
          format.printf((info:any) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  
      )}),
  
  });
  
  // export function unCoughtErrorHandler(
  //   err: any,
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   winston.error(JSON.stringify(err));
  //   res.end({ error: err });
  // }
  
  // export function apiErrorHandler(
  //   err: any,
  //   req: Request,
  //   res: Response,
  //   message: string,
  // ) {
  //   const error: object = { Message: message, Request: req, Stack: err };
  //   winston.error(error);
  //   res.json({ Message: message });
  // }