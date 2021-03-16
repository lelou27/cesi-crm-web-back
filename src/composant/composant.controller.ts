import { Body, Controller, Get, Post, UseGuards,Delete, Param } from '@nestjs/common';
import { ComposantService } from './composant.service';
import { ComposantDto } from '../Dto/ComposantDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('composant')
@UseGuards(JwtAuthGuard)
export class ComposantController {
  constructor(private composantService: ComposantService) {}

  //Récupération de tous les composants
  @Get()
  async getComposants() {
    return await this.composantService.getAllComposants();
  }

  //Création d'un composant
  @Post()
  async createComposant(@Body() composantDto: ComposantDto) {
    try {
      return await this.composantService.create(composantDto);
    } catch (e) {
      throw e;
    }
  }

  //Suppression d'un composant à partir de son id
  @Delete(':id')
  async deleteUser(@Param('id') composantId) {
    return await this.composantService.deleteComposant(composantId);
  }
}
