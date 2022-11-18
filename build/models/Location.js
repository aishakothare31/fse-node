"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Location declares the location of user.
 * @typedef Location: gives the coordiantes of a user.
 * @property {number} longitude: precise longitudue of user's location.
 * @property {number} latitude: precise latitude of user's location.
 */
class Location {
    constructor() {
        this.latitude = 0.0;
        this.longitude = 0.0;
    }
}
exports.default = Location;
;
