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
exports.authRoutes = void 0;
const express_1 = require("express");
const authService_1 = require("../services/authService");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const authService = new authService_1.AuthService();
    try {
        const token = yield authService.login(email, password);
        res.json({ token });
    }
    catch (e) {
        console.error(e);
        if (e instanceof authService_1.SenhaInvalida) {
            res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(500).json({ message: "Unexpected error occurred" });
    }
}));
