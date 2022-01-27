import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';
export declare class PermissionService extends AbstractService {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
}
