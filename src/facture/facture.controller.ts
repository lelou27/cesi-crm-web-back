import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param, Post,
  Res, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs';
import { FactureService } from './facture.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('facture')
export class FactureController {
  constructor(private factureService: FactureService) {}

  @Get('/all/:idClient')
  async getFacturesByClient(@Param() idClient) {
    return await this.factureService.getFacturesByClientId(idClient.idClient);
  }

  @Get('generateFacture/:devisId')
  async generateFacture(@Res() res, @Param() devisId) {
    const buffer = await this.factureService.generateFacture(devisId.devisId);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }

  @Get('/download/:filename')
  async downloadFile(@Res() res, @Param() filename) {
    if (!filename || !filename.filename) {
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    filename = filename.filename;
    const path = require('path');
    const appDir = path.dirname(require.main.filename);

    const file = fs.createReadStream(`${appDir}/public/${filename}`);
    const stat = fs.statSync(`${appDir}/public/${filename}`);

    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
  }
}
