import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty() readonly user: object;
}
