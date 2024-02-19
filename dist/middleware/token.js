"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = ({ _id, name, email }) => {
    return jsonwebtoken_1.default.sign({
        _id,
        name,
        email,
        date: new Date(),
    }, process.env.SECRET);
};
exports.default = generateAccessToken;
