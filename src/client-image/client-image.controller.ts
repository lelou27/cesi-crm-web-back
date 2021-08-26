import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientImageService } from './client-image.service';
import { createReadStream } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';

import { join } from 'path';

@Controller('client-image')
export class ClientImageController {
  constructor(private clientImageService: ClientImageService) {}

  @Get(':idClient')
  async getFileByIdClient(@Param() idClient) {
    if (!idClient) {
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.clientImageService.getFileByIdClient(idClient);
    } catch (e) {
      throw e;
    }
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() image: Express.Multer.File,
    @Body('idClient') idClient,
  ) {
    const clientImage = await this.clientImageService.saveImage(
      idClient,
      image.filename,
    );

    return {
      originalname: image.originalname,
      filename: image.filename,
      clientImage: clientImage,
    };

    // const file = createReadStream(join(process.cwd(), `./public/clientImages/${image.filename}`));
    // file.pipe(res);
  }

  @Get('/download/:idClient')
  async downloadFile(@Res() res, @Param() idClient) {
    const clientImage = await this.clientImageService.getFileByIdClient(
      idClient,
    );

    if (!clientImage) {
      return null;
    }

    const file = createReadStream(
      join(
        process.cwd(),
        `./public/clientImages/${clientImage.clientImagePath}`,
      ),
    );
    return file.pipe(res);
  }
}
