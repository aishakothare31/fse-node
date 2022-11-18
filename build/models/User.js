"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Declares Users data type.
 */
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
/**
 * @typedef Users represents user on tuiter.
 * @property {string} username: Primary Key of user
 * @property {string} password: account password
 * @property {string} firstName: First Name of user
 * @property {string} lastName: Last Name of user
 * @property {string} email: user's email id
 * @property {string} profilePhoto: Profile Picture of user
 * @property {string} headerImage: Hedear Image of User
 * @property {AccountType} accountType: Type of Account of user
 * @property {MaritalStatus} maritalStatus: Marital status of user
 * @property {string} biography: Bio specified by user
 * @property {Date} dateOfBirth: Date of Birth of user
 * @property {Date} joined: Date user joined Tuiter
 * @property {Location} location: Location of user
 */
class User {
    constructor() {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MaritalStatus_1.default.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
    }
}
exports.default = User;
