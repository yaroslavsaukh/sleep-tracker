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
exports.sendMail = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = ({ subject, to, text }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_MAIL,
                pass: process.env.MAIL_API_KEY,
            },
        });
        const recipients = to.join(', ');
        const result = yield transporter.sendMail({
            from: {
                name: 'Sleep Tracker',
                address: `${process.env.MAIL_MAIL}`,
            },
            to: recipients,
            subject,
            text,
        });
        return result;
    }
    catch (e) {
        console.log(e);
        throw (0, http_errors_1.default)(500, 'Error while sending email');
    }
});
exports.sendMail = sendMail;
