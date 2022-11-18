"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Messages represents the message a user wants to send to another user.
 * @property {User} sender: represents the user sending the message.
 * @property {User} receiver: represents the user receiving the message.
 */
class Messages {
    constructor() {
        this.sender = null;
        this.receiver = null;
        this.message = null;
        this.sentOn = null;
    }
}
exports.default = Messages;
