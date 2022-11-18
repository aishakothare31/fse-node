"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file MessagesModel implements the mongoose model to CRUD docs in messages collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const MessagesScehma_1 = __importDefault(require("./MessagesScehma"));
const MessagesModel = mongoose_1.default.model('MessagesModel', MessagesScehma_1.default);
exports.default = MessagesModel;
