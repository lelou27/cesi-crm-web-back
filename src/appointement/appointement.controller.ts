import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointementService } from './appointement.service';
import { CreateAppointementDto } from './dto/create-appointement.dto';
import { UpdateAppointementDto } from './dto/update-appointement.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('appointement')
@UseGuards(JwtAuthGuard)
export class AppointementController {
  constructor(private readonly appointementService: AppointementService) {}

  @Post()
  create(@Body() createAppointementDto: CreateAppointementDto) {
    return this.appointementService.create(createAppointementDto);
  }

  @Get()
  findAll() {
    return this.appointementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointementService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAppointementDto: UpdateAppointementDto) {
    return this.appointementService.update(+id, updateAppointementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointementService.remove(id);
  }
}
