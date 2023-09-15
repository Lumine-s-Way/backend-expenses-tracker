import { DataSource } from 'typeorm';
import { DataSourceEnum, RepositoryEnum } from '@shared/enums';
import { UsersEntity } from '@auth/entities';


export const authProviders = [
  {
    provide: RepositoryEnum.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsersEntity),
    inject: [DataSourceEnum.PG_DATA_SOURCE],
  },
];
