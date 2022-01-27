"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const abstract_service_1 = require("../common/abstract.service");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("./order.entity");
const typeorm_2 = require("typeorm");
let OrderService = class OrderService extends abstract_service_1.AbstractService {
    constructor(orderRepository) {
        super(orderRepository);
        this.orderRepository = orderRepository;
    }
    async paginate(page = 1, relations = []) {
        const { data, meta } = await super.paginate(page, relations);
        return {
            data: data.map((order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items,
            })),
            meta,
        };
    }
    async chart() {
        return this.orderRepository.query(`
        SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, sum(item.price * item.quantity) as sum
        FROM orders o
            JOIN order_items item on o.id = item.order_id
        GROUP BY date;
    `);
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map