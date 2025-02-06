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
exports.TicketService = void 0;
const eventModel_1 = require("../models/eventModel");
const ticketModel_1 = require("../models/ticketModel");
class TicketService {
    createMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield eventModel_1.EventModel.findById(data.eventId);
            if (!event) {
                throw new Error("Event not Found");
            }
            const ticketsData = Array(data.numTickets)
                .fill({})
                .map((_, index) => ({
                location: `Location ${index}`,
                event_id: event.id,
                price: data.price,
                status: ticketModel_1.TicketStatus.available,
            }));
            yield ticketModel_1.TicketModel.createMany(ticketsData);
        });
    }
    findByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield eventModel_1.EventModel.findById(eventId);
            if (!event) {
                throw new Error("Event not Found");
            }
            return ticketModel_1.TicketModel.findAll({ where: { event_id: eventId } });
        });
    }
    findById(eventId, ticketId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield ticketModel_1.TicketModel.findById(ticketId);
            return ticket && ticket.event_id === eventId ? ticket : null;
        });
    }
}
exports.TicketService = TicketService;
