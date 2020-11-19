import { Body, Controller, Get, Post, UseGuards,Delete, Param } from '@nestjs/common';
import { ComposantService } from './composant.service';
import { ComposantDto } from '../Dto/ComposantDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('composant')
@UseGuards(JwtAuthGuard)
export class ComposantController {
  constructor(private composantService: ComposantService) {}

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

  @Delete(':id')
  async deleteUser(@Param('id') composantId) {
    return await this.composantService.deleteComposant(composantId);
  }
}
