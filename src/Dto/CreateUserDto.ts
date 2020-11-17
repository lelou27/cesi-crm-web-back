import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../Schemas/role.schema';

export class CreateUserDto {
  @ApiProperty() readonly prenom: string;
  @ApiProperty() readonly nom: string;
  @ApiProperty() readonly email: string;
  @ApiProperty() readonly telephone: number;
  @ApiProperty() readonly username: string;
  @ApiProperty() password: string;
  @ApiProperty() role: Role;
}
