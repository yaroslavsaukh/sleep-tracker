"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomCode = void 0;
const generateRandomCode = () => {
    return Math.random().toString(36).substr(2, 6); // Пример: случайная строка из 6 символов
};
exports.generateRandomCode = generateRandomCode;
