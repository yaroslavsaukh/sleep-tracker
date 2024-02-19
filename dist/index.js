"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connect_db_1 = __importDefault(require("./db/connect-db"));
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = require("./middleware/error-handler");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
try {
    (0, connect_db_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use('/api', routes_1.apiRouter);
    app.use(error_handler_1.errorHandler);
}
catch (e) {
    console.log(e);
}
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
