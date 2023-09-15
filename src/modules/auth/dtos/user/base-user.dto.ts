import { IsString } from 'class-validator';
import {
  isStringValidationOptions,
} from '@shared/validation';

export class BaseUserDto {

  @IsString(isStringValidationOptions())
  readonly username: string;

  @IsString(isStringValidationOptions())
  readonly password: string;
  
}
