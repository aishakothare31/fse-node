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
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarksModel
 * to integrate with MongoDB
 */
const BookmarksModel_1 = __importDefault(require("../mongoose/BookmarksModel"));
/**
 * @class BookmarksDao Implements Data Access Object managing data storage
 * of bookmarks
 * @property {BookmarksDao} bookmarksDao Private single instance of BookmarksDao
 */
class BookmarksDao {
    constructor() {
        /**
         * Uses BookmarksModel to retrieve all bookmarks from bookmarks collection
         * @param {string} uid User id for which bookmarks are to be retrieved
         * @returns Promise To be notified when the bookmarks are retrieved from
         * database
         */
        this.findAllBookmarks = (uid) => __awaiter(this, void 0, void 0, function* () {
            return BookmarksModel_1.default.find({ bookmarkedBy: uid })
                .populate("bookmarkedTuit")
                .exec();
        });
        /**
         * Uses BookmarksModel to create a new Bookmark for a user for specified tuit.
         * @param {string} uid User id who wants to bookmark a tuit
         * @param {string} tid Tuit id of tuit to be bookmarked
         * @returns Promise To be notified when the bookmarks are added to
         * database
         */
        this.bookmarkTuit = (tid, uid) => __awaiter(this, void 0, void 0, function* () { return BookmarksModel_1.default.create({ bookmarkedTuit: tid, bookmarkedBy: uid }); });
        /**
         * Uses BookmarksModel to delete a Bookmark for tuit.
         * @param {string} uid User id of user who unbookmark the tuit
         * @param {string} tid Tuit id of tuit to be unbookmark
         * @returns Promise To be notified when the bookmarks are deleted from
         * database
         */
        this.unbookmarkTuit = (tid, uid) => __awaiter(this, void 0, void 0, function* () { return BookmarksModel_1.default.deleteOne({ bookmarkedTuit: tid, bookmarkedBy: uid }); });
    }
}
exports.default = BookmarksDao;
BookmarksDao.bookmarksDao = null;
BookmarksDao.getInstance = () => {
    if (BookmarksDao.bookmarksDao === null) {
        BookmarksDao.bookmarksDao = new BookmarksDao();
    }
    return BookmarksDao.bookmarksDao;
};
