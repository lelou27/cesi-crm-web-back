import { Controller, Get, Param, Res } from '@nestjs/common';
import * as fs from 'fs';
import { FactureService } from './facture.service';

@Controller('facture')
export class FactureController {
  constructor(private factureService: FactureService) {}

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

  @Get('/download/:id')
  async downloadFile(@Res() res, @Param() id) {
    const facture = await this.factureService.getFactureById(id);

    const file = fs.createReadStream(
      'C:/Users/leandreg/projects/perso/crm-web-cesi-api/public/RIL.pdf',
    );
    const stat = fs.statSync(
      'C:/Users/leandreg/projects/perso/crm-web-cesi-api/public/RIL.pdf',
    );
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);
  }
}
