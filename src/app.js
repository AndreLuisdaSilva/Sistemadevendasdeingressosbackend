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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Databases_1 = require("./controller/Databases");
const authController_1 = require("./controller/authController");
const partnerController_1 = require("./controller/partnerController");
const customerControlller_1 = require("./controller/customerControlller");
const eventController_1 = require("./controller/eventController");
const userService_1 = require("./services/userService");
const ticketController_1 = require("./controller/ticketController");
const purchaseController_1 = require("./controller/purchaseController");
//Model View Controller - Arquitetura camadas npm run app:build
//Middleware
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const unprotectedRoutes = [
    { method: "POST", path: "/auth/login" },
    { method: "POST", path: "/customers/register" },
    { method: "POST", path: "/partners/register" },
    { method: "GET", path: "/events" },
];
exports.app.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isUnprotectedRoute = unprotectedRoutes.some((route) => route.method == req.method && req.path.startsWith(route.path));
    if (isUnprotectedRoute) {
        return next();
    }
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, "123456");
        const userService = new userService_1.UserService();
        const user = yield userService.findById(payload.id);
        if (!user) {
            res.status(401).json({ message: "Failed to authenticate token" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Failed to authenticate token" });
    }
}));
exports.app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});
exports.app.use('/auth', authController_1.authRoutes);
exports.app.use('/partners', partnerController_1.partnerRoutes);
exports.app.use('/customers', customerControlller_1.customerRoutes);
exports.app.use('/events', eventController_1.eventRoutes);
exports.app.use('/events', ticketController_1.ticketRoutes);
exports.app.use('/purchases', purchaseController_1.purchaseRoutes);
exports.app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = Databases_1.Database.getInstance();
    yield connection.execute("SET FOREIGN_KEY_CHECKS = 0");
    yield connection.execute("TRUNCATE TABLE reservation_tickets");
    yield connection.execute("TRUNCATE TABLE purchase_tickets");
    yield connection.execute("TRUNCATE TABLE purchases");
    yield connection.execute("TRUNCATE TABLE tickets");
    yield connection.execute("TRUNCATE TABLE events");
    yield connection.execute("TRUNCATE TABLE customers");
    yield connection.execute("TRUNCATE TABLE partners");
    yield connection.execute("TRUNCATE TABLE users");
    yield connection.execute("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Running in http://localhost:3000");
}));
//MVC - Model View Controller (Arquitetura em camadas)
//Application Service - o que eu quero expor como regras cruciais da aplicação
//Domain Service - Criptografar senha
//Active Record - Encapsular lógica de arma. e de negócio
