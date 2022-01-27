import { UserService } from '../user/user.service';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    private jwtService;
    private authService;
    constructor(userService: UserService, jwtService: JwtService, authService: AuthService);
    register(body: RegisterDto): Promise<any>;
    login(email: string, password: string, response: Response): Promise<any>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<any>;
}
