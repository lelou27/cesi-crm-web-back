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
import { UnitéService } from './unité.service';
import { UnitéDto } from '../Dto/UnitéDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('unite')
// @UseGuards(JwtAuthGuard)
export class UnitéController {
  constructor(private unitéService: UnitéService) {}

  //Récupération de toutes les unités
  @Get()
  async getUnités() {
    return await this.unitéService.getAllUnités();
  }

  //Récupération d'une unité en partant de son id
  @Get(':id')
  async getUnitéById(@Param() params) {
    if (!params.id) {
      throw new HttpException(
        'Impossible de trouver le paramètre id.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.unitéService.getById(params.id);
  }

  //Création d'une unité
  @Post()
  async createUnité(@Body() unitéDto: UnitéDto) {
    try {
      return await this.unitéService.createUnité(unitéDto);
    } catch (e) {
      throw e;
    }
  }

  //Suppression d'une unité à partir de son id
  @Delete(':id')
  async deleteUnite(@Param('id') uniteId) {
    return await this.unitéService.deleteUnite(uniteId);
  }
}
