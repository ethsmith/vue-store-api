import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
export declare class RoleService extends AbstractService {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
}
