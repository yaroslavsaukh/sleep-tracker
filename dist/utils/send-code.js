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
exports.sendCode = void 0;
const twilio_1 = __importDefault(require("twilio"));
const http_errors_1 = __importDefault(require("http-errors"));
const sendCode = (code, phone) => __awaiter(void 0, void 0, void 0, function* () {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = (0, twilio_1.default)(accountSid, authToken);
    try {
        yield client.messages.create({
            body: `Your code is ${code}`,
            from: process.env.TWILIO_NUMBER,
            to: phone,
        });
    }
    catch (e) {
        throw (0, http_errors_1.default)(404, 'Error while sending code');
    }
});
exports.sendCode = sendCode;
