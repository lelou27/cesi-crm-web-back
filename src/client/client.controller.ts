import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from '../Dto/CreateClientDto';

@Controller('/client')
//@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private clientService: ClientService) {
  }

  @Get('/:id')
  async getClient(@Param('id') param) {
    return await this.clientService.getClient(param);
  }

  @Get()
  async getAllClient() {
    return await this.clientService.getAllClient();
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
