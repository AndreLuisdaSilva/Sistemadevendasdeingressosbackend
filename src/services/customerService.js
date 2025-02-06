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
exports.CustomerService = void 0;
const userModel_1 = require("../models/userModel");
const Databases_1 = require("../controller/Databases");
const customerModel_1 = require("../models/customerModel");
class CustomerService {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, address, phone } = data;
            const connection = yield Databases_1.Database.getInstance().getConnection();
            try {
                yield connection.beginTransaction();
                const user = yield userModel_1.UserModel.create({
                    name,
                    email,
                    password,
                }, { connection });
                const customer = yield customerModel_1.CustomerModel.create({
                    user_id: user.id,
                    address,
                    phone,
                }, { connection });
                yield connection.commit();
                return {
                    id: customer.id,
                    name,
                    user_id: user.id,
                    address,
                    phone,
                    created_at: customer.created_at,
                };
            }
            catch (e) {
                yield connection.rollback();
                throw e;
            }
            finally {
                yield connection.release();
            }
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return customerModel_1.CustomerModel.findByUserId(userId, { user: true });
        });
    }
}
exports.CustomerService = CustomerService;
// auto commit - insert, update, delete
// transaction
//init
//N transaction
//commit
//rollback
