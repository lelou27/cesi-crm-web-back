import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { GammeService } from './gamme.service';
import { CreateGammeDto } from '../Dto/CreateGammeDTO';

@Controller('gamme')
export class GammeController {
  constructor(private gammeService: GammeService) {}

  @Get('/all')
  async getAllGamme() {
    return await this.gammeService.getAllGamme();
  }

  @Get(':id')
  async getGammeById(@Param() id) {
    if (!id.id) {
      return new HttpException(
        'Impossible de trouver le paramètre id.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.gammeService.getGammeById(id.id);
  }

  @Post()
  async createGamme(@Body() createGammeDto: CreateGammeDto) {
    return await this.gammeService.createGamme(createGammeDto);
  }

}
