"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const globalErrorhandler_1 = __importDefault(require("./app/middleware/globalErrorhandler"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api", routes_1.default);
app.use(globalErrorhandler_1.default);
app.use(notFound_1.default);
exports.default = app;
