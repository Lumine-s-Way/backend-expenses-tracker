import { Exclude, Expose } from 'class-transformer';
import { BaseUserDto } from './base-user.dto';


@Exclude()
export class ReadUserDto extends BaseUserDto {
  @Expose()
  readonly id;

  @Expose()
  readonly username;

  @Expose()
  readonly password;
}
