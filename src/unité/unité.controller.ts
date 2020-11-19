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
import { UnitéService } from './unité.service';
import { UnitéDto } from '../Dto/UnitéDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('unite')
@UseGuards(JwtAuthGuard)
export class UnitéController {
  constructor(private unitéService: UnitéService) {}

  @Get()
  async getUnités() {
    return await this.unitéService.getAllUnités();
  }

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

  @Post()
  async createUnité(@Body() unitéDto: UnitéDto) {
    try {
      return await this.unitéService.createUnité(unitéDto);
    } catch (e) {
      throw e;
    }
  }
}
