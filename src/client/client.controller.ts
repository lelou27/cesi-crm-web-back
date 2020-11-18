import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('/client')
//@UseGuards(JwtAuthGuard)
export class ClientController {
  constructor(private clientService: ClientService) {
  }

  @Get('/:id')
  async getClient(@Param('id') param) {
    return await this.clientService.getClient(param);
  }
}
