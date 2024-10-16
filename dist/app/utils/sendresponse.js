"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statuseCode).json({
        success: data.success,
        message: data.message,
        token: data.token,
        data: data.data,
    });
};
exports.default = sendResponse;
