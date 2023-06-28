import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { HasPermission } from '../permission/has-permission.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('orders')
  @HasPermission('orders')
  @UseGuards(AuthGuard)
  async all(@Query('page') page = 1) {
    return this.orderService.paginate(page, ['order_items']);
  }

  @Post('orders')
  async create(@Body() body) {
    const { order_items, ...data } = body;

    return this.orderService.create({
      ...data,
      order_items: order_items,
    });
  }

  @Post('export')
  @HasPermission('view_orders')
  @UseGuards(AuthGuard)
  async export(@Res() response: Response) {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    });

    const orders = await this.orderService.all(['order_items']);
    const json = [];

    orders.forEach((order: Order) => {
      json.push({
        ID: order.id,
        Name: order.name,
        Email: order.email,
        'Product Title': '',
        Price: '',
        Quantity: '',
      });

      order.order_items.forEach((item: OrderItem) => {
        json.push({
          ID: '',
          Name: '',
          Email: '',
          'Product Title': item.product_title,
          Price: item.price,
          Quantity: item.quantity,
        });
      });
    });

    const csv = parser.parse(json);
    response.header('Content-Type', 'text/csv');
    response.attachment('orders.csv');
    return response.send(csv);
  }

  @Get('chart')
  @UseGuards(AuthGuard)
  @HasPermission('orders')
  async chart() {
    return this.orderService.chart();
  }
}
