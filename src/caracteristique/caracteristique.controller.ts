import {
  Body,
  Controller,
  Get,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CaracteristiqueService } from './caracteristique.service';
import { CaracteristiqueDto } from '../Dto/CaracteristiqueDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('caracteristique')
@UseGuards(JwtAuthGuard)
export class CaracteristiqueController {
  constructor(private caracteristiqueService: CaracteristiqueService) {}

  //Récupération de toutes les caractéristiques
  @Get()
  async getCaracteristiques() {
    return await this.caracteristiqueService.getAllCaracteristiques();
  }

  //Récupération d'une caractéristique à partir de son id
  @Get(':id')
  async getCaracteristiqueById(@Param() params) {
    if (!params.id) {
      throw new HttpException(
        'Impossible de trouver le paramètre id.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.caracteristiqueService.getById(params.id);
  }

  //Création d'une caractéristique
  @Post()
  async createCaracteristique(@Body() caracteristiqueDto: CaracteristiqueDto) {
    try {
      return await this.caracteristiqueService.createCaracteristique(
        caracteristiqueDto,
      );
    } catch (e) {
      throw e;
    }
  }

  //Suppression d'une caractéristique à partir de son id
  @Delete(':id')
  async deleteCaracteristique(@Param('id') caracteristiqueId) {
    return await this.caracteristiqueService.deleteCaracteristique(caracteristiqueId);
  }
}
