"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const purchaseModel_1 = require("../models/purchaseModel");
const ticketModel_1 = require("../models/ticketModel");
const purchaseTicketmodel_1 = require("../models/purchaseTicketmodel");
const customerModel_1 = require("../models/customerModel");
const reservationTicketmodel_1 = require("../models/reservationTicketmodel");
const Databases_1 = require("../controller/Databases");
class PurchaseService {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validação do customerId
            if (typeof data.customerId !== 'number' || isNaN(data.customerId)) {
                console.error("Erro: customerId inválido. Deve ser um número.");
                throw new Error("customerId inválido."); // Ou retorne um valor padrão ou trate o erro de outra forma
            }
            const customer = yield customerModel_1.CustomerModel.findById(data.customerId, {
                user: true, //eager loading
            });
            if (!customer) {
                throw new Error("Customer not found");
            }
            const tickets = yield ticketModel_1.TicketModel.findAll({
                where: { ids: data.ticketIds },
            });
            if (tickets.length !== data.ticketIds.length) {
                throw new Error("Some tickets not found");
            }
            if (tickets.some((t) => t.status !== ticketModel_1.TicketStatus.available)) {
                throw new Error("Some tickets are not available");
            }
            const amount = tickets.reduce((total, ticket) => total + ticket.price, 0);
            const db = Databases_1.Database.getInstance();
            const connection = yield db.getConnection();
            let purchase;
            try {
                yield connection.beginTransaction();
                purchase = yield purchaseModel_1.PurchaseModel.create({
                    customer_id: data.customerId,
                    total_amount: amount,
                    status: purchaseModel_1.PurchaseStatus.pending,
                }, { connection });
                yield this.associateTicketsWithPurchase(purchase.id, data.ticketIds, connection);
                yield connection.commit();
            }
            catch (error) {
                yield connection.rollback();
                throw error;
            }
            finally {
                connection.release();
            }
            try {
                yield connection.beginTransaction();
                purchase.status = purchaseModel_1.PurchaseStatus.paid;
                yield purchase.update({ connection });
                yield reservationTicketmodel_1.ReservationTicketModel.create({
                    customer_id: data.customerId,
                    ticket_id: data.ticketIds[0],
                    status: reservationTicketmodel_1.ReservationStatus.reserved,
                }, { connection });
                yield this.paymentService.processPayment({
                    name: customer.user.name,
                    email: customer.user.email,
                    address: customer.address,
                    phone: customer.phone,
                }, purchase.total_amount, data.cardToken);
                yield connection.commit();
                return purchase.id;
            }
            catch (error) {
                yield connection.rollback();
                purchase.status = purchaseModel_1.PurchaseStatus.error;
                yield purchase.update({ connection });
                throw error;
            }
            finally {
                connection.release();
            }
        });
    }
    associateTicketsWithPurchase(purchaseId, ticketIds, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const purchaseTickets = ticketIds.map((ticketId) => ({
                purchase_id: purchaseId,
                ticket_id: ticketId,
            }));
            yield purchaseTicketmodel_1.PurchaseTicketModel.createMany(purchaseTickets, { connection });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return purchaseModel_1.PurchaseModel.findById(id);
        });
    }
}
exports.PurchaseService = PurchaseService;
