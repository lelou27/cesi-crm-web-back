import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty() readonly role: string;
}
