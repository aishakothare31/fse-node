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
const LikesModel_1 = __importDefault(require("../mongoose/LikesModel"));
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
class LikesDao {
    constructor() {
        /**
      * Uses LikeModel to retrieve all liked tuits by a user from likes collection
      * @param {string} uid User id for which likes are to be retrieved
      * @returns Promise To be notified when the likes are retrieved from
      * database
      */
        this.findTuitsUserLiked = (uid) => __awaiter(this, void 0, void 0, function* () {
            // return await LikesModel.findById(uid);
            return LikesModel_1.default
                .find({ user: uid })
                .populate("likedTuit")
                .exec();
        });
        /**
       * Uses LikeModel to retrieve all likes from likes collection
       * @param {string} tid Tuit id of tuit who likes the tuit
       * @returns Promise To be notified when the likes are retrieved from
       * database
       */
        this.findUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () {
            return LikesModel_1.default
                .find({ tuit: tid })
                .populate("likedBy")
                .exec();
        });
        /**
       * Uses LikeModel to create a new like for tuit.
       * @param {string} uid User id of user who likes the tuit
       * @param {string} tid Tuit id of tuit to be liked
       * @returns Promise To be notified when the likes are retrieved from
       * database
       */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikesModel_1.default.create({ likedTuit: tid, likedBy: uid }); });
        /**
       * Uses LikeModel to remove a  like for tuit.
       * @param {string} uid User id of user who unlikes the tuit
       * @param {string} tid Tuit id of tuit to be unliked
       * @returns Promise To be notified when the likes are deleted from
       * database
       */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikesModel_1.default.deleteOne({ tuit: tid, likedBy: uid }); });
        /**
           * Uses LikeModel to count number of likes a tuit has.
           * @param {string} tid Tuit id of tuit to be unliked
           * @returns Promise To be notified with the total likes on specific tuit.
           */
        this.findTuitLikesCount = (tid) => __awaiter(this, void 0, void 0, function* () { return LikesModel_1.default.countDocuments({ likedTuit: tid }); });
    }
}
exports.default = LikesDao;
LikesDao.likesDao = null;
LikesDao.getInstance = () => {
    if (LikesDao.likesDao === null) {
        LikesDao.likesDao = new LikesDao();
    }
    return LikesDao.likesDao;
};
