import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { UsersEntity } from '@auth/entities';
import { UsersService } from '@auth/services';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '@auth/dtos';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: 'Create One' })
    // @Auth()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() payload: CreateUserDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.usersService.create(payload);

        return {
            data: serviceResponse.data,
            message: 'User created',
            title: 'Created',
        };
    }

    // @Auth()
    @ApiOperation({ summary: 'Catalogue' })
    @Get('catalogue')
    @HttpCode(HttpStatus.OK)
    async catalogue(): Promise<ResponseHttpModel> {
        const serviceResponse = await this.usersService.catalogue();

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: `catalogue`,
            title: `Catalogue`,
        };
    }

    @ApiOperation({ summary: 'Find All' })
    // @Auth()
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() params: FilterUserDto): Promise<ResponseHttpModel> {
        const serviceResponse = await this.usersService.findAll(params);

        return {
            data: serviceResponse.data,
            pagination: serviceResponse.pagination,
            message: `index`,
            title: 'Success',
        };
    }

    @ApiOperation({ summary: 'Find One' })
    // @Auth()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.usersService.findOne(id);

        return {
            data: serviceResponse.data,
            message: `show ${id}`,
            title: `Success`,
        };
    }

    @ApiOperation({ summary: 'Update One' })
    // @Auth()
    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() payload: UpdateUserDto,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.usersService.update(id, payload);

        return {
            data: serviceResponse.data,
            message: `User updated ${id}`,
            title: `Updated`,
        };
    }

    @ApiOperation({ summary: 'Remove One' })
    // @Auth()
    @Delete(':id')
    @HttpCode(HttpStatus.CREATED)
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
    ): Promise<ResponseHttpModel> {
        const serviceResponse = await this.usersService.remove(id);

        return {
            data: serviceResponse.data,
            message: `User deleted ${id}`,
            title: `Deleted`,
        };
    }

    @ApiOperation({ summary: 'Remove All' })
    // @Auth()
    @Patch('remove-all')
    @HttpCode(HttpStatus.CREATED)
    async removeAll(@Body() payload: UsersEntity[]): Promise<ResponseHttpModel> {
        const serviceResponse = await this.usersService.removeAll(payload);
        //
        return {
            data: serviceResponse.data,
            message: `Users deleted`,
            title: `Deleted`,
        };
    }

}
