import { AuthService } from '@auth/services';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseHttpModel } from '@shared/models';
import { LoginDto } from '../../dtos/auth/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @ApiOperation({ summary: 'Login' })
    // @PublicRoute()
    @Post('login')
    @HttpCode(HttpStatus.CREATED)
    async login(@Body() payload: LoginDto): Promise<ResponseHttpModel> {
      const serviceResponse = await this.authService.login(payload);
  
      return {
        data: serviceResponse.data,
        message: 'Correct Access',
        title: 'Welcome',
      };
    }

    
}
