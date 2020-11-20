import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GammeService } from './gamme.service';
import { CreateGammeDto } from '../Dto/CreateGammeDTO';
import { AddModuleDto } from '../Dto/AddModuleDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('gamme')
// @UseGuards(JwtAuthGuard)
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

  @Put('/modules/:id')
  async addModules(@Param() gammeId, @Body() addModuleDto: AddModuleDto) {
    return await this.gammeService.addModules(gammeId.id, addModuleDto);
  }

  @Delete(':id')
  async deleteGamme(@Param() id) {
    console.log(id.id)
    return await this.gammeService.deleteGamme(id.id);
  }
}
