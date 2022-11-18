"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file LikesModel implements the mongoose model to CRUD docs in likes collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const LikesSchema_1 = __importDefault(require("./LikesSchema"));
const LikesModel = mongoose_1.default.model('LikesModel', LikesSchema_1.default);
exports.default = LikesModel;
