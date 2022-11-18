"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../mongoose/UserModel"));
/**
 * @class UserDao Implements Data Access Object managing data storage
 * for Users
 */
class UserDao {
    /**
   * Uses UserModel to retrieve all user docs from users collection
   * @returns Promise To be notified when the users are retrieved from
   * database
   */
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.find();
        });
    }
    /**
    * Uses UserModel to retrieve single user doc from users collection
    * @param {string} uid User's primary key
    * @returns Promise To be notified when user is retrieved from the database
    */
    findUserById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(uid);
        });
    }
    /**
    * Inserts user instance into the database
    * @param {User} user Instance to be inserted into the database
    * @returns Promise To be notified when user is inserted into the database
    */
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.create(user);
        });
    }
    /**
   * Deletes user instance from the database
   * @param {string} uid User's primary key to be deleted
   * @returns Promise To be notified when user is removed from the database
   */
    deleteUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ _id: uid });
        });
    }
    /**
    * Updates user with new values in database
    * @param {string} uid Primary key of user to be modified
    * @param {User} user User object containing properties and their new values
    * @returns Promise To be notified when user is updated in the database
    */
    updateUser(uid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.updateOne({ _id: uid }, { $set: user });
        });
    }
    /**
    * Deletes user instance from the database
    * @param {string} username User's name on tuiter to be deleted
    * @returns Promise To be notified when user is removed from the database
    */
    deleteUsersByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.deleteOne({ username: username });
        });
    }
    /**
    * Find user instance from the database
    * @param {string} username User's name on tuiter to be found
    * @returns Promise To be notified when user is found
    */
    findUsersByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ username: username });
        });
    }
}
exports.default = UserDao;
UserDao.dao = null;
/**
 * Returns the instance of UseerDao.
 * If instance absent then instance created and returned
 * @returns {UserDao} singleton of User DAO
 */
UserDao.getInstance = () => {
    if (UserDao.dao === null) {
        UserDao.dao = new UserDao();
    }
    return UserDao.dao;
};
