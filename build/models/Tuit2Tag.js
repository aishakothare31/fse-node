"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Represents Tuit to Tag.
 */
const Tuit_1 = __importDefault(require("./Tuit"));
/**
 * @typedef Tuit2Tag represents the relation between tuit and tag.
 * @property {string} tag: the base hashtag tuit comes under.
 * @property {Tuit} tuit: the original tuit posted.
 */
class Tuit2Tag {
    constructor() {
        this.tag = '';
        this.tuit = new Tuit_1.default();
    }
}
exports.default = Tuit2Tag;
