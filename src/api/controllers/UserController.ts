import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { Authorized, Body, Get, JsonController, Post, Req } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { User } from '../models/User';
import { UserService } from '../services/UserService';

class BaseUser {
    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    public username: string;
}

export class UserResponse extends BaseUser {
    @IsUUID()
    public token: string;

    public gisToken: string;
}

export class AuthenticateUserBody extends BaseUser {
    @IsEmail()
    public email: string;

    public password: string;
}

export class DestroySessionBody extends BaseUser {
    @IsUUID()
    public token: string;
}

@Authorized()
@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get('/me')
    @ResponseSchema(UserResponse, { isArray: true })
    public findMe(@Req() req: any): Promise<User[]> {
        return req.user;
    }

    @Post()
    @ResponseSchema(UserResponse)
    public login(@Body() body: AuthenticateUserBody): Promise<User> {
        return this.userService.login();
    }

    @Post()
    @ResponseSchema(UserResponse)
    public logout(@Body() body: DestroySessionBody): Promise<boolean> {
        return this.userService.logout();
    }
}
