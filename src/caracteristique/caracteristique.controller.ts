// import { Controller } from '@nestjs/common';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CaracteristiqueService } from './caracteristique.service';
import { CaracteristiqueDto } from '../Dto/CaracteristiqueDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('caracteristique')
// @UseGuards(JwtAuthGuard)
export class CaracteristiqueController {
	constructor(private caracteristiqueService:CaracteristiqueService){}

	@Get()
  	async getCaracteristiques() {
    	return await this.caracteristiqueService.getAllCaracteristiques();
  	}

  	@Get(':id')
  	async getCaracteristiqueById(@Param() params) {
    	if (!params.id) {
      		throw new HttpException("Impossible de trouver le paramètre id.", HttpStatus.BAD_REQUEST);
    	}
    	return await this.caracteristiqueService.getById(params.id);
  	}

  	@Post()
  	async createCaracteristique(@Body() caracteristiqueDto: CaracteristiqueDto) {
    	try {
      		return await this.caracteristiqueService.createCaracteristique(caracteristiqueDto);
    	} catch (e) {
      	throw e;
    }
  }
}
