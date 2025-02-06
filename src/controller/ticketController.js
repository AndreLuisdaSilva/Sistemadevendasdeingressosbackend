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
exports.ticketRoutes = void 0;
const express_1 = require("express");
const ticketService_1 = require("../services/ticketService");
const partnerService_1 = require("../services/partnerService");
exports.ticketRoutes = (0, express_1.Router)();
exports.ticketRoutes.post("/:eventId/tickets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const partnerService = new partnerService_1.PartnerService();
    const partner = yield partnerService.findByUserId(userId);
    if (!partner) {
        res.status(403).json({ message: "Not authorized" });
        return;
    }
    const { num_tickets, price } = req.body;
    const { eventId } = req.params;
    const ticketService = new ticketService_1.TicketService();
    yield ticketService.createMany({
        eventId: +eventId,
        numTickets: num_tickets,
        price,
    });
    res.status(204).send();
}));
exports.ticketRoutes.get("/:eventId/tickets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const ticketService = new ticketService_1.TicketService();
    const data = yield ticketService.findByEventId(+eventId);
    res.json(data);
}));
exports.ticketRoutes.get("/:eventId/tickets/:ticketId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId, ticketId } = req.params;
    const ticketService = new ticketService_1.TicketService();
    const ticket = yield ticketService.findById(+eventId, +ticketId);
    if (!ticket) {
        res.status(404).json({ message: "Ticket not found" });
        return;
    }
    res.json(ticket);
}));
