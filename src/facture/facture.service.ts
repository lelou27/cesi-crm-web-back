import { Get, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Module, ModuleDocument } from '../Schemas/module.schema';
import { Model, Types } from 'mongoose';
import { Facture, FactureDocument } from '../Schemas/facture.schema';
import { Devis, DevisDocument } from '../Schemas/devis.schema';
import {
  DevisModuleQte,
  DevisModuleQteDocument,
  DevisModuleQteSchema,
} from '../Schemas/DevisModuleQte.schema';

import * as PDFDocument from 'pdfkit';

@Injectable()
export class FactureService {
  constructor(
    @InjectModel(Facture.name) private factureModel: Model<FactureDocument>,
    @InjectModel(Devis.name) private devisModel: Model<DevisDocument>,
    @InjectModel(DevisModuleQte.name)
    private devisModuleQteModel: Model<DevisModuleQteDocument>,
  ) {}

  async getFactureById(id) {
    return this.factureModel
      .findById(id)
      .populate('devis')
      .populate('client')
      .populate('modules');
  }

  async generateFacture(devisId) {
    const devis = await this.devisModel
      .findById(devisId)
      .populate('client')
      .populate('modules')
      .populate('composants');

    const dm = await this.getDevisModuleQte(devis._id);

    const pdf = await this.generatePDF(devis, dm);
    return pdf;
  }

  async getDevisModuleQte(devisId) {
    return this.devisModuleQteModel
      .find({
        devis: devisId,
      })
      .populate('moduleId');
  }

  async generatePDF(devis, dm): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });
      // customize your PDF document
      doc.text(`Nom du projet : ${devis.nomProjet}`, {
        width: 150,
        align: 'left',
      });
      doc.text(`Devis : ${devis.referenceProjet}`, {
        width: 150,
        align: 'left',
      });
      doc.text(`Client : ${devis.client.first_name}`, {
        width: 150,
        align: 'left',
      });
      doc.text(`${devis.client.email}`, {
        width: 150,
        align: 'left',
      });
      doc.text(`${devis.client.phone}`, {
        width: 150,
        align: 'left',
      });
      doc.text(`${devis.client.address}`, {
        width: 450,
        align: 'right',
      });
      doc.text(`${devis.client.postal_code}`, {
        width: 450,
        align: 'right',
      });
      doc.text(`${devis.client.city}`, {
        width: 450,
        align: 'right',
      });
      doc.text(`${devis.client.country}`, {
        width: 450,
        align: 'right',
      });
      doc.text(`Date du devis : ${devis.dateDevis}`, {
        width: 450,
        align: 'left',
      });

      for (const mod of devis.modules) {
        const dmForModule =
          dm.filter((d) => d.moduleId._id.toString()) == mod._id.toString();

        doc.text(`Module : ${mod.nomModule} `, {
          width: 450,
          align: 'left',
        });

        doc
          .text(`Quantitée : ${dmForModule['qte']} `, {
            width: 450,
            align: 'left',
          })
          .moveDown(0.5);
      }

      const lorem =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;';

      doc.text(lorem, {
        columns: 3,
        columnGap: 15,
        height: 200,
        width: 465,
        align: 'justify',
        continued: true,
      });
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }
}
