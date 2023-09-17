import { CreateUserDto, FilterUserDto, ReadUserDto, UpdateUserDto } from '@auth/dtos';
import { UsersEntity } from '@auth/entities';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';
import { plainToInstance } from 'class-transformer';
import { Repository, FindOptionsWhere, ILike } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @Inject(RepositoryEnum.USER_REPOSITORY)
        private userRepository: Repository<UsersEntity>,
      ) {}
    
      async create(payload: CreateUserDto): Promise<ServiceResponseHttpModel> {
        const newUser = this.userRepository.create(payload);
        const userCreated = await this.userRepository.save(newUser);
    
        return { data: plainToInstance(ReadUserDto, userCreated) };
      }
    
      async catalogue(): Promise<ServiceResponseHttpModel> {
        const response = await this.userRepository.findAndCount({ take: 1000 });
    
        return {
          data: response[0],
          pagination: { totalItems: response[1], limit: 10 },
        };
      }
    
      async findAll(params?: FilterUserDto): Promise<ServiceResponseHttpModel> {
        //Pagination & Filter by Search
        // if (params?.limit > 0 && params?.page >= 0) {
        //   return await this.paginateAndFilter(params);
        // }

    
        //All
        const response = await this.userRepository.findAndCount({
          relations: {},
          order: { updatedAt: 'DESC' },
        });
    
        return {
          data: plainToInstance(ReadUserDto, response[0]),
          pagination: { totalItems: response[1], limit: 10 },
        };
      }
    
      async findOne(id: string): Promise<ServiceResponseHttpModel> {
        const user = await this.userRepository.findOne({
          where: { id },
          relations: {},
        });
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        return { data: plainToInstance(ReadUserDto, user) };
      }
    
      async update(
        id: string,
        payload: UpdateUserDto,
      ): Promise<ServiceResponseHttpModel> {
        const user = await this.userRepository.preload({ id, ...payload });
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const userUpdated = await this.userRepository.save(user);
    
        return { data: plainToInstance(ReadUserDto, userUpdated) };
      }
    
      async remove(id: string): Promise<ServiceResponseHttpModel> {
        const user = await this.userRepository.findOneBy({ id });
    
        if (!user) {
          throw new NotFoundException('User not found');
        }
    
        const userDeleted = await this.userRepository.softRemove(user);
    
        return { data: plainToInstance(ReadUserDto, userDeleted) };
      }
    
      async removeAll(payload: UsersEntity[]): Promise<ServiceResponseHttpModel> {
        const usersDeleted = await this.userRepository.softRemove(payload);
        return { data: usersDeleted };
      }
    
    //   private async paginateAndFilter(
    //     params: FilterUserDto,
    //   ): Promise<ServiceResponseHttpModel> {
    //     let where:
    //       | FindOptionsWhere<UsersEntity>
    //       | FindOptionsWhere<UsersEntity>[];
    //     where = {};
    //     let { page, search } = params;
    //     const { limit } = params;
    
    //     if (search) {
    //       search = search.trim();
    //       page = 0;
    //       where = [];
    //       where.push(
    //         {
    //           username: ILike(`%${search}%`),
    //         },
    //       );
    //     }
    
    //     const response = await this.userRepository.findAndCount({
    //       where,
    //       relations: {},
    //       take: limit,
    //       skip: PaginationDto.getOffset(limit, page),
    //       order: {
    //         updatedAt: 'DESC',
    //       },
    //     });
    
    //     return {
    //       data: plainToInstance(ReadUserDto, response[0]),
    //       pagination: { limit, totalItems: response[1] },
    //     };
    //   }


}
