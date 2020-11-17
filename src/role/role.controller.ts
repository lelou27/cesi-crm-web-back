import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
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

  @Post()
  async createRole(@Body() roleDto: RoleDto) {
    try {
      return await this.roleService.createRole(roleDto);
    } catch (e) {
      throw e;
    }
  }
}
