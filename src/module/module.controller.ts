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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ModuleService } from './module.service';
import { CreateModuleDto } from '../Dto/createModuleDto';
import { AddComposantDto } from '../Dto/AddComposantDto';

@Controller('module')
@UseGuards(JwtAuthGuard)
export class ModuleController {
  constructor(private moduleService: ModuleService) {}

  @Get('all')
  async getAllModules() {
    return await this.moduleService.getAllModules();
  }

  @Get(':moduleId')
  async getModuleById(@Param() moduleId) {
    if (!moduleId) {
      throw new HttpException(
        'Le paramètre id est obligatoire',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.moduleService.getModuleById(moduleId.moduleId);
  }

  @Post()
  async createModule(@Body() createModuleDto: CreateModuleDto) {
    if (typeof createModuleDto.composants === 'string') {
      createModuleDto.composants = JSON.parse(createModuleDto.composants);
    }
    return await this.moduleService.createModule(createModuleDto);
  }

  @Put('/composants/:id')
  async addComposants(
    @Param() moduleId,
    @Body() addComposantDto: AddComposantDto,
  ) {
    return await this.moduleService.addComposant(moduleId.id, addComposantDto);
  }

  @Delete(':id')
  async removeComposant(@Param() moduleId) {
    return await this.moduleService.removeComposants(moduleId.id);
  }
}
