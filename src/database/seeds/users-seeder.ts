import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@auth/dtos';
import { 
  // RolesService, 
  UsersService } from '@auth/services';
// import { RoleEntity } from '@auth/entities';
// import { RoleEnum } from '@auth/enums';

@Injectable()
export class UsersSeeder {
  constructor(
    // private rolesService: RolesService,
    private usersService: UsersService,
  ) {}

  async run() {
    await this.createUsers();
  }

  async createUsers() {
    const users: CreateUserDto[] = [];
    // const roles = (await this.rolesService.findAll()).data as RoleEntity[];

    users.push(
      {
        // email: 'admin@gmail.com',
        // lastname: 'Administrator',
        // name: 'Admin',
        password: '12345678',
        // passwordChanged: false,
        // roles: [adminRole],
        username: 'admin',
      },
    );

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
