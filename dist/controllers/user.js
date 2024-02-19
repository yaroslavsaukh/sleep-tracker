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
exports.updateSelf = exports.self = exports.list = void 0;
const User_1 = __importDefault(require("../db/models/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
              "bearerAuth": []
      }] */
    try {
        const list = yield User_1.default.find();
        res.status(200).json({ list });
    }
    catch (e) {
        next(e);
    }
});
exports.list = list;
const self = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
              "bearerAuth": []
      }] */
    try {
        const { _id } = req === null || req === void 0 ? void 0 : req.user;
        const user = yield User_1.default.findOne({ _id }).select('-password -_id');
        if (!user) {
            throw (0, http_errors_1.default)(500, 'No user');
        }
        res.status(200).json({ user });
    }
    catch (e) {
        next(e);
    }
});
exports.self = self;
const updateSelf = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Users']
    /* #swagger.security = [{
              "bearerAuth": []
      }] */
    try {
        const { _id } = req === null || req === void 0 ? void 0 : req.user;
        const { name, email, gender, password, birthday, phone } = req.body;
        const upd = { name, email, gender, password, birthday, phone };
        const user = yield User_1.default.findOneAndUpdate({ _id }, upd, {
            new: true,
        }).select('-password -_id');
    }
    catch (e) {
        next(e);
    }
});
exports.updateSelf = updateSelf;
