"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookmarksDao_1 = __importDefault(require("../daos/BookmarksDao"));
/**
 * @class BookmarksController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/bookmarks :retrieve tuits bookmarked by a user
 *     </li>
 *     <li>POST /users/:uid/bookmarks/:tid :record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /users/:uid/unbookmarks/:tid :record that a user unbookmarked a tuit</li>
 * </ul>
 * @property {BookmarksController} BookmarksController Singleton DAO implementing bookmarks CRUD operations
 * @property {bookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
class BookmarksController {
    constructor() {
        /**
         * Retrieves all tuits bookmarked by a user from the database
         * @param {Request} req Represents client request: includes the path
         * parameter uid representing the user bookmarked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were bookmarked
         */
        this.findAllBookmarks = (req, res) => BookmarksController.bookmarksDao.findAllBookmarks(req.params.uid)
            .then(bookmarks => res.json(bookmarks));
        /**
         * @param {Request} req Represents client request: includes the
         * path parameters uid and tid representing the user whos bookmarking the tuit
         * and the tuit being bookmarked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new bookmarks that was inserted in the
         * database
         */
        this.bookmarkTuit = (req, res) => BookmarksController.bookmarksDao.bookmarkTuit(req.params.tid, req.params.uid)
            .then(bookmarks => res.json(bookmarks));
        /**
         * @param {Request} req Represents client request: includes the
         * path parameters uid and tid representing the user unbookmarking
         * the tuit and the tuit being unbookmarked
         * @param {Response} res Represents response to client, including status
         * on whether deleting the bookmark was successful or not
         */
        this.unbookmarkTuit = (req, res) => BookmarksController.bookmarksDao.unbookmarkTuit(req.params.tid, req.params.uid)
            .then(status => res.send(status));
    }
}
exports.default = BookmarksController;
BookmarksController.bookmarksDao = BookmarksDao_1.default.getInstance();
BookmarksController.bookmarksController = null;
BookmarksController.getInstance = (app) => {
    if (BookmarksController.bookmarksController === null) {
        BookmarksController.bookmarksController = new BookmarksController();
        app.get("/users/:uid/bookmarks", BookmarksController.bookmarksController.findAllBookmarks);
        app.post("/users/:uid/bookmarks/:tid", BookmarksController.bookmarksController.bookmarkTuit);
        app.delete("/users/:uid/unbookmarks/:tid", BookmarksController.bookmarksController.unbookmarkTuit);
    }
    return BookmarksController.bookmarksController;
};
