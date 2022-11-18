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
/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowsModel
 * to integrate with MongoDB
 */
const FollowsModel_1 = __importDefault(require("../mongoose/FollowsModel"));
/**
 * @class FollowsDao Implements Data Access Object managing data storage
 * of messages
 * @property {FollowsDao} followsDao Private single instance of MessagesDao
 */
class FollowsDao {
    constructor() {
        /**
       * Uses FollowsModel to retrieve all follows of the user.
       * @param {string} uid User whose followers list is to be retrieved
       * @returns Promise To be notified when the follows are retrieved from
       * database
       */
        this.findAllFollowers = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowsModel_1.default.find({ followedBy: uid })
                .populate("following")
                .exec();
        });
        /**
       * Uses FollowsModel to retrieve all following of the user.
       * @param {string} uid User whose following list is to be retrieved
       * @returns Promise To be notified when the following are retrieved from
       * database
       */
        this.findAllFollowing = (uid) => __awaiter(this, void 0, void 0, function* () {
            return FollowsModel_1.default.find({ following: uid })
                .populate("followedBy")
                .exec();
        });
        /**
       * Inserts follow instance into the database
       * @param {string} uid_cur User who will follow
       * @param {string} uid User who will be followed
       * @returns Promise To be notified when message is inserted into the database
       */
        this.follow = (uid_cur, uid) => __awaiter(this, void 0, void 0, function* () { return FollowsModel_1.default.create({ followedBy: uid_cur, following: uid }); });
        /**
       * Removes follow instance from the database
       * @param {string} uid_cur User who will unfollow
       * @param {string} uid User who will be unfollowed
       * @returns Promise To be notified when message is deleted from the database
       */
        this.unfollow = (uid_cur, uid) => __awaiter(this, void 0, void 0, function* () { return FollowsModel_1.default.deleteOne({ followedBy: uid_cur, following: uid }); });
    }
}
exports.default = FollowsDao;
FollowsDao.followsDao = null;
FollowsDao.getInstance = () => {
    if (FollowsDao.followsDao == null) {
        FollowsDao.followsDao = new FollowsDao();
    }
    return FollowsDao.followsDao;
};
