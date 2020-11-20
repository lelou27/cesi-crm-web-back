import { Get, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Facture, FactureDocument } from '../Schemas/facture.schema';
import { Devis, DevisDocument } from '../Schemas/devis.schema';
import {
  DevisModuleQte,
  DevisModuleQteDocument,
} from '../Schemas/DevisModuleQte.schema';

import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class FactureService {
  constructor(
    @InjectModel(Facture.name) private factureModel: Model<FactureDocument>,
    @InjectModel(Devis.name) private devisModel: Model<DevisDocument>,
    @InjectModel(DevisModuleQte.name)
    private devisModuleQteModel: Model<DevisModuleQteDocument>,
  ) {}

  async getFacturesByClientId(idClient): Promise<Facture[]> {
    return this.factureModel
      .find({ client: ObjectId(idClient) })
      .populate('client');
  }

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

    const pdf = await this.generatePDF(devis);
    return pdf;
  }

  async getDevisModuleQte(devisId) {
    return this.devisModuleQteModel
      .find({
        devis: devisId,
      })
      .populate('moduleId');
  }

  async generatePDF(devis): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });
      this.createDocument(doc, devis);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    await this.saveFile(devis, pdfBuffer);

    return pdfBuffer;
  }

  async saveFacture(filename, devisId, clientId) {
    return await new this.factureModel({
      devis: devisId,
      filename: filename,
      client: clientId,
    }).save();
  }

  async saveFile(devis, pdfBuffer) {
    const path = require('path');
    const appDir = path.dirname(require.main.filename);
    const filename = `${devis._id}-${Date.now()}-facture.pdf`;

    const file = fs.writeFile(
      `${appDir}/public/${filename}`,
      pdfBuffer,
      'utf8',
      (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      },
    );

    await this.saveFacture(filename, devis._id, devis.client);
  }

  createDocument(doc, devis) {
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
      doc
        .text(`Module : ${mod.nomModule} `, {
          width: 450,
          align: 'left',
        })
        .moveDown(0.5);
    }

    return doc;
  }
}
