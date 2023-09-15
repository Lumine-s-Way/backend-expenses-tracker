import { IsString, IsOptional } from 'class-validator';
// import { PaginationDto } from '@core/dto';
import { isStringValidationOptions } from '@shared/validation';
import { PaginationDto } from '@core/dtos';

export class FilterUserDto extends PaginationDto {
  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly username: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly password: string;
}
