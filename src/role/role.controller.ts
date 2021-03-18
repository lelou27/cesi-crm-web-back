import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from '../Dto/RoleDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  async getRoles() {
    return await this.roleService.getAllRoles();
  }

  @Get(':id')
  async getRoleById(@Param() params) {
    if (!params.id) {
      throw new HttpException("Impossible de trouver le paramètre id.", HttpStatus.BAD_REQUEST);
    }
    return await this.roleService.getById(params.id);
  }

  @Get('/name/:name')
  async getRoleByName(@Param() params) {
    if (!params.name) {
      throw new HttpException("Impossible de trouver le paramètre id.", HttpStatus.BAD_REQUEST);
    }
    return await this.roleService.getByName(params.name);
  }

  @Post()
  async createRole(@Body() roleDto: RoleDto) {
    try {
      return await this.roleService.createRole(roleDto);
    } catch (e) {
      throw e;
    }
  }

  @Patch(':id')
  async updateRole(@Body() roleDto: RoleDto, @Param('id') id) {
    try {
      console.log(id);
      return await this.roleService.updateRole(roleDto, id);
    } catch (e) {
      throw e;
    }
  }

  @Delete(':id')
  async removeComposant(@Param() roleId) {
    return await this.roleService.removeRole(roleId.id);
  }
}
