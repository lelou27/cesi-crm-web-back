import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DevisService } from './devis.service';
import { CreateDevisDto } from '../Dto/CreateDevisDto';

@Controller('devis')
@UseGuards(JwtAuthGuard)
export class DevisController {
  constructor(private devisService: DevisService) {}

  @Get('/all')
  async getAllDevis() {
    return await this.devisService.getAllDevis();
  }

  @Get(':id')
  async getDevisById(@Param() id) {
    if (!id.id) {
      return new HttpException(
        'Impossible de trouver le paramètre id.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.devisService.getDevisById(id.id);
  }

  @Post()
  async createDevis(@Body() createDevisDto: CreateDevisDto) {
    return await this.devisService.createDevis(createDevisDto);
  }
}
