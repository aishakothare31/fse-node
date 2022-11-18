"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file FollowsModel implements the mongoose model to CRUD docs in follows collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const FollowsSchema_1 = __importDefault(require("./FollowsSchema"));
const FollowsModel = mongoose_1.default.model("FollowsModel", FollowsSchema_1.default);
exports.default = FollowsModel;
