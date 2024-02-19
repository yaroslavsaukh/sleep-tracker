"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const verify_token_1 = __importDefault(require("../middleware/verify-token"));
const user_1 = require("../controllers/user");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/list', verify_token_1.default, user_1.list);
exports.userRouter.get('/self', verify_token_1.default, user_1.self);
exports.userRouter.patch('/update', verify_token_1.default, user_1.updateSelf);
