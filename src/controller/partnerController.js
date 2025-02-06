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
exports.partnerRoutes = void 0;
const express_1 = require("express");
const partnerService_1 = require("../services/partnerService");
const eventService_1 = require("../services/eventService");
exports.partnerRoutes = (0, express_1.Router)();
exports.partnerRoutes.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, company_name } = req.body;
    const partnerService = new partnerService_1.PartnerService();
    const result = yield partnerService.register({
        name,
        email,
        password,
        company_name,
    });
    res.status(201).json(result);
}));
exports.partnerRoutes.post("/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, date, location } = req.body;
    const userId = req.user.id;
    const partnerService = new partnerService_1.PartnerService();
    const partner = yield partnerService.findByUserId(userId);
    if (!partner) {
        res.status(403).json({ message: "Not authorized" });
        return;
    }
    const eventService = new eventService_1.EventService();
    const result = yield eventService.create({
        name,
        description,
        date: new Date(date),
        location,
        partnerId: partner.id,
    });
    res.status(201).json(result);
}));
exports.partnerRoutes.get("/events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const partnerService = new partnerService_1.PartnerService();
    const partner = yield partnerService.findByUserId(userId);
    if (!partner) {
        res.status(403).json({ message: "Not authorized" });
        return;
    }
    const eventService = new eventService_1.EventService();
    const result = yield eventService.findAll(partner.id);
    res.json(result);
}));
exports.partnerRoutes.get("/events/:eventId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    const userId = req.user.id;
    const partnerService = new partnerService_1.PartnerService();
    const partner = yield partnerService.findByUserId(userId);
    if (!partner) {
        res.status(403).json({ message: "Not authorized" });
        return;
    }
    const eventService = new eventService_1.EventService();
    console.log(`eventId: ${eventId}, userId: ${userId}`);
    const event = yield eventService.findById(+eventId);
    if (!event || event.partner_id !== partner.id) {
        res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
}));
