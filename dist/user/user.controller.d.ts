import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    all(page?: number): Promise<import("../common/paginated-result").PaginatedResult>;
    get(id: number): Promise<any>;
    updateInfo(request: Request, body: UserUpdateDto): Promise<any>;
    updatePassword(request: Request, password: string, password_confirm: string): Promise<any>;
    create(body: UserCreateDto): Promise<User>;
    update(id: number, body: UserUpdateDto): Promise<any>;
    delete(id: number): Promise<any>;
}
