import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty() readonly prenom: string;
  @ApiProperty() readonly nom: string;
  @ApiProperty() readonly email: string;
  @ApiProperty() readonly telephone: number;
  @ApiProperty() readonly username: string;
  @ApiProperty() password: string;
  @ApiProperty() role: string;
}
