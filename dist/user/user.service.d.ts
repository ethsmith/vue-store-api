import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { AbstractService } from '../common/abstract.service';
import { PaginatedResult } from '../common/paginated-result';
export declare class UserService extends AbstractService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    paginate(page?: number, relations?: any[]): Promise<PaginatedResult>;
}
