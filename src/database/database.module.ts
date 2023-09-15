import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { UsersSeeder } from './seeds/users-seeder';
// import { RolesSeeder } from './seeds/roles-seeder';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    UsersSeeder,
    // RolesSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
