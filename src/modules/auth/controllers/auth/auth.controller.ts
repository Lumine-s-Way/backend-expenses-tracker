import { AuthService } from '@auth/services';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseHttpModel } from '@shared/models';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() payload: Object): Promise<ResponseHttpModel> {
        const serviceResponse = await this.authService.login(payload);
        return {
            data: serviceResponse.data,
            message: 'Correct Access',
            title: 'Welcome',
        };

    }
}
