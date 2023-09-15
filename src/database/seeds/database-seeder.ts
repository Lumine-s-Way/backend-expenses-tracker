import { Injectable } from '@nestjs/common';
import { UsersSeeder } from './users-seeder';
// import { RolesSeeder } from './roles-seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    // private usersSeeder: UsersSeeder,
    // private rolesSeeder: RolesSeeder,
  ) {}

  async run() {
    // await this.rolesSeeder.run();
    // await this.usersSeeder.run();
  }
}
