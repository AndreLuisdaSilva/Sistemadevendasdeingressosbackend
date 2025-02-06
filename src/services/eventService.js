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
exports.EventService = void 0;
const eventModel_1 = require("../models/eventModel");
class EventService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, date, location, partnerId } = data;
            const event = yield eventModel_1.EventModel.create({
                name,
                description,
                date,
                location,
                partner_id: partnerId,
            });
            return {
                id: event.id,
                name,
                description,
                date,
                location,
                created_at: event.created_at,
                partner_id: partnerId,
            };
        });
    }
    findAll(partnerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return eventModel_1.EventModel.findAll({
                where: { partner_id: partnerId },
            });
        });
    }
    findById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            return eventModel_1.EventModel.findById(eventId);
        });
    }
}
exports.EventService = EventService;
