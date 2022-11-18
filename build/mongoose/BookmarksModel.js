"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file BookmarksModel implements the mongoose model to CRUD docs in bookmarks collection.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const BookmarksSchema_1 = __importDefault(require("./BookmarksSchema"));
const BookmarksModel = mongoose_1.default.model("BookmarksModel", BookmarksSchema_1.default);
exports.default = BookmarksModel;
