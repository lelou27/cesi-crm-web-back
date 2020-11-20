import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from '../Dto/CreateClientDto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateClientDto } from '../Dto/UpdateClientDto';

@Controller('/client')
@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get(':id')
  async getClient(@Param('id') param) {
    return await this.clientService.getClient(param);
  }

  @Get()
  async getAllClient() {
    return await this.clientService.getAllClient();
  }

  @Put(':id')
  async updateClient(@Param('id') clientId, @Body() updateClientDto: UpdateClientDto) {
    return await this.clientService.updateClient(clientId, updateClientDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') clientId) {
    return await this.clientService.deleteClient(clientId);
  }

  @Post('/create')
  async createClient(@Body() ClientDto: CreateClientDto) {
    try {
      return await this.clientService.createClient(ClientDto);
    } catch (e) {
      throw e;
    }
  }
}
