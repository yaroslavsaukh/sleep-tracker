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
exports.resetPassword = exports.forgotPassword = exports.list = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../db/models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = __importDefault(require("http-errors"));
const token_1 = __importDefault(require("../middleware/token"));
const generate_code_1 = require("../utils/generate-code");
const send_code_1 = require("../utils/send-code");
const add_number_1 = require("../utils/add-number");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, gender, password, birthday, phone } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser)
            throw (0, http_errors_1.default)({ code: 400, message: 'Username already exists' });
        const hashedPass = bcrypt_1.default.hashSync(password, 10);
        const user = yield User_1.default.create({
            name,
            email,
            gender,
            password: hashedPass,
            birthday,
            phone,
        });
        const accessToken = (0, token_1.default)({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
        res.status(200).json(accessToken);
    }
    catch (e) {
        next(e);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!password || !email) {
            throw (0, http_errors_1.default)(400, {
                message: 'Please provide both email and password',
                code: 'login - missing email or password',
            });
        }
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            throw (0, http_errors_1.default)(404, {
                message: 'Cannot find user with provided email',
                code: 'login - missing user with provided email',
            });
        }
        const result = bcrypt_1.default.compareSync(password, user.password);
        if (!result) {
            throw (0, http_errors_1.default)(401, {
                message: 'Invalid email password pair',
                code: 'login - invalid credentials pair',
            });
        }
        const accessToken = (0, token_1.default)({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
        res.status(200).json(accessToken);
    }
    catch (e) {
        next(e);
    }
});
exports.login = login;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield User_1.default.find();
        res.status(200).json(list);
    }
    catch (e) {
        next(e);
    }
});
exports.list = list;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, email } = req.body;
        if (phone) {
            const user = yield User_1.default.findOne({ phone });
            if (!user) {
                throw (0, http_errors_1.default)(404, {
                    message: 'Cannot find user with provided email',
                    code: 'login - missing user with provided email',
                });
            }
            const resetCode = (0, generate_code_1.generateRandomCode)();
            yield (0, add_number_1.addNumber)();
            yield user.updateOne({ code: resetCode });
            yield (0, send_code_1.sendCode)(resetCode, phone);
            res.status(200).json('Sms sended successfully');
        }
        else {
            const user = yield User_1.default.findOne({ email });
            res.status(200).json(user);
        }
    }
    catch (e) {
        next(e);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, phone, resetCode, newPassword } = req.body;
        const user = yield User_1.default.findOne({ phone });
        if ((user === null || user === void 0 ? void 0 : user.code) !== resetCode) {
            throw (0, http_errors_1.default)(404, {
                message: 'Invalid code',
                code: 'login - missing user with provided email',
            });
        }
        const newHashedPassword = bcrypt_1.default.hashSync(newPassword, 10);
        yield (user === null || user === void 0 ? void 0 : user.updateOne({ password: newHashedPassword, code: null }));
        return res.status(200).json({ message: 'Password reset successfully' });
    }
    catch (e) {
        next(e);
    }
});
exports.resetPassword = resetPassword;
