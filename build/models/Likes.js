"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef Likes shows likes relation between a User and a Tuit.
 * @property {Tuit} likedTuit: the tuit a user liked.
 * @property {User} likedBy: the user liked a tuit.
 */
class Likes {
    constructor() {
        this.likedTuit = null;
        this.likedBy = null;
    }
}
exports.default = Likes;
;
