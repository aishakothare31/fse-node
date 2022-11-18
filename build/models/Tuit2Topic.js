"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Represents Tuit to Topic.
 */
const Tuit_1 = __importDefault(require("./Tuit"));
/**
 * @typedef Tuit2Topic represents the relation between tuit and topics.
 * @property {string} topic: the base topic of tuit.
 * @property {Tuit} tuit: the original tuit posted.
 */
class Tuit2Topic {
    constructor() {
        this.topic = '';
        this.tuit = new Tuit_1.default();
    }
}
exports.default = Tuit2Topic;
