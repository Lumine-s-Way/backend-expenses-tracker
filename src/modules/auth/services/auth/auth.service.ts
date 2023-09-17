import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '@auth/entities';
import { LoginDto, PasswordChangeDto } from '@auth/dtos';
import { PayloadTokenModel } from '@auth/models';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(RepositoryEnum.USER_REPOSITORY)
        private repository: Repository<UsersEntity>,
        private readonly userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async changePassword(id: string, payload: PasswordChangeDto) {
        const user = await this.repository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatchPassword = await this.checkPassword(payload.oldPassword, user);

        if (!isMatchPassword) {
            throw new BadRequestException('The old password is not match.');
        }

        if (payload.confirmationPassword !== payload.newPassword) {
            throw new BadRequestException('The passwords do not match.');
        }

        user.password = payload.newPassword;

        await this.repository.save(user);

        return { data: true };
    }

    async login(payload: LoginDto) {
        const user = await this.findByUsername(payload.username);



        // if (user && user.maxAttempts === 0)
        //   throw new UnauthorizedException(
        //     'User exceeded the maximum number of attempts allowed.',
        //   );

        // if (user && user.suspendedAt)
        //   throw new UnauthorizedException('User is suspended.');


        if (!user || !(await this.checkPassword(payload.password, user))) {
          throw new UnauthorizedException('Wrong username and/or password.');
        }

        // user.activatedAt = new Date();
        // const { password, roles, ...userRest } = user;

        // await this.repository.update(userRest.id, userRest);

        const accessToken = this.generateJwt(user);

        return { data: { accessToken, user } };
    }

    //   async findProfile(id: string): Promise<ServiceResponseHttpModel> {
    //     const user = await this.repository.findOne({
    //       where: { id },
    //       relations: {
    //       },
    //     });

    //     if (!user) {
    //       throw new NotFoundException('User not found');
    //     }

    //     return { data: plainToInstance(ReadProfileDto, user) };
    //   }

    //   async findUserInformation(id: string): Promise<ServiceResponseHttpModel> {
    //     const user = await this.repository.findOneBy({ id });

    //     if (!user) {
    //       throw new NotFoundException('User not found');
    //     }

    //     return { data: plainToInstance(ReadUserInformationDto, user) };
    //   }



    refreshToken(user: UsersEntity) {
        const accessToken = this.generateJwt(user);

        return { data: { accessToken, user } };
    }

    private generateJwt(user: UsersEntity) {
        const payload: PayloadTokenModel = { id: user.id };

        return this.jwtService.sign(payload);
    }

    private async findByUsername(username: string): Promise<UsersEntity> {
        return await this.repository.findOneBy({ username });
    }

    private async checkPassword(passwordCompare: string, user: UsersEntity) {
        const { password, ...userRest } = user;
        const isMatch = Bcrypt.compareSync(passwordCompare, password);
        return user;

        if (isMatch) {
            //   userRest.maxAttempts = 3;
            await this.repository.save(userRest);
            return user;
        }

        // userRest.maxAttempts =
        //   userRest.maxAttempts > 0 ? userRest.maxAttempts - 1 : 0;
        await this.repository.save(userRest);

        return null;
    }
}
