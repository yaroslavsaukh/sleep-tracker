"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Обработчик ошибок
const errorHandler = (err, req, res, next) => {
    console.log('\x1b[31m%s', String('-').repeat(50));
    console.log(err.status);
    console.log(`Message: ${err.message}`);
    console.log(`Path: ${req.path}`);
    console.log('\x1b[31m%s', String('-').repeat(50));
    res
        .status((err === null || err === void 0 ? void 0 : err.status) || 500)
        .json(Object.assign({ message: err.message, path: req.path, key: err.code }, err));
};
exports.errorHandler = errorHandler;
