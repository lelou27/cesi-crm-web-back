import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  async getClient(id: string): Promise<{ first_name: string }> {
    const dataa = [{ first_name: 'Michel' }, { first_name: 'Jackie' }];
    return dataa[id];
    //return await this.UserModel.find().populate('role').exec();
  }
}
