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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const User_1 = __importDefault(require("../db/models/User"));
const verifyToken = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization)
            throw (0, http_errors_1.default)(401, {
                message: 'Missing token',
                code: 'mw - missing token',
            });
        const splitedToken = authorization.split(' ');
        const bearer = splitedToken[0];
        if (!bearer)
            throw (0, http_errors_1.default)(401, {
                message: 'Invalid token',
                code: 'mw - invalid token',
            });
        const token = splitedToken[1];
        const secret = process.env.SECRET;
        if (!token || !secret)
            throw (0, http_errors_1.default)(401, {
                message: 'Invalid token',
                code: 'mw - invalid token',
            });
        jsonwebtoken_1.default.verify(token, secret, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                throw (0, http_errors_1.default)(401, {
                    message: 'Invalid token',
                    code: 'mw - invalid token',
                });
            }
            const isSuspended = yield User_1.default.findOne({ email: user.email });
            if ((isSuspended === null || isSuspended === void 0 ? void 0 : isSuspended.status) === 'stopped') {
                throw (0, http_errors_1.default)(401, {
                    message: 'Account was suspended. Contact us for more info',
                    code: 'mw - account suspended',
                });
            }
            else {
                req.user = user;
                next();
            }
        }));
    }
    catch (error) {
        next(error);
    }
});
exports.default = verifyToken;
