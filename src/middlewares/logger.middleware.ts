import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const params = [];
    const dateAndTime = moment().format('DD/MM/YYYY HH:mm:ss');
    for (const query of Object.keys(req.query)) {
      params.push(`${query} : ${req.query[query]}`);
    }

    console.log(`[${dateAndTime}] [] [${req.method}] ${req.baseUrl}`);
    params.length > 0
      ? console.log(`[${dateAndTime}] params : ${params.join(' / ')}`)
      : '';

    next();
  }
}
