// import { Controller } from '@nestjs/common';
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ComposantService } from './composant.service';
import { UnitéDto } from '../Dto/UnitéDto';
import { ComposantDto } from '../Dto/ComposantDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Caracteristique } from '../Schemas/caracteristique.schema';
import { Unité } from '../Schemas/unité.schema';

@Controller('composant')
// @UseGuards(JwtAuthGuard)
export class ComposantController {
	constructor(private composantService:ComposantService){}

	@Get()
  	async getComposants() {
    	return await this.composantService.getAllComposants();
  	}

  	// @Get(':id')
  	// async getComposantById(@Param() params) {
   //  	if (!params.id) {
   //    		throw new HttpException("Impossible de trouver le paramètre id.", HttpStatus.BAD_REQUEST);
   //  	}
   //  	return await this.composantService.getById(params.id);
  	// }

  	@Post()
  	async createComposant(@Body() composantDto: ComposantDto) {
    	try {
      		return await this.composantService.create(composantDto);
    	} catch (e) {
      	throw e;
    }
  }
}
