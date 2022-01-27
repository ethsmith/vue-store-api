import { Permission } from '../permission/permission.entity';
export declare class Role {
    id: number;
    name: string;
    permissions: Permission[];
}
