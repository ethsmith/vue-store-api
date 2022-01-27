import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { PermissionGuard } from "./permission/permission.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'admin',
      autoLoadEntities: true, // dont use this on production
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    ProductModule,
    OrderModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
