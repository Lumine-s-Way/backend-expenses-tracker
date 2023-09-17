import { isStringValidationOptions, isNotEmptyValidationOptions } from "@shared/validation";
import { IsString, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsString(isStringValidationOptions())
    @IsNotEmpty(isNotEmptyValidationOptions())
    username: string;
  
    @IsString(isStringValidationOptions())
    @IsNotEmpty()
    password: string;
  }