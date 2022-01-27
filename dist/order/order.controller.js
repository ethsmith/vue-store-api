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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const auth_guard_1 = require("../auth/auth.guard");
const json2csv_1 = require("json2csv");
const has_permission_decorator_1 = require("../permission/has-permission.decorator");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async all(page = 1) {
        return this.orderService.paginate(page, ['order_items']);
    }
    async create(body) {
        const { order_items } = body, data = __rest(body, ["order_items"]);
        return this.orderService.create(Object.assign(Object.assign({}, data), { order_items: order_items }));
    }
    async export(response) {
        const parser = new json2csv_1.Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
        });
        const orders = await this.orderService.all(['order_items']);
        const json = [];
        orders.forEach((order) => {
            json.push({
                ID: order.id,
                Name: order.name,
                Email: order.email,
                'Product Title': '',
                Price: '',
                Quantity: '',
            });
            order.order_items.forEach((item) => {
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
    async chart() {
        return this.orderService.chart();
    }
};
__decorate([
    (0, common_1.Get)('orders'),
    (0, has_permission_decorator_1.HasPermission)('orders'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "all", null);
__decorate([
    (0, common_1.Post)('orders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('export'),
    (0, has_permission_decorator_1.HasPermission)('view_orders'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "export", null);
__decorate([
    (0, common_1.Get)('chart'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, has_permission_decorator_1.HasPermission)('orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "chart", null);
OrderController = __decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map