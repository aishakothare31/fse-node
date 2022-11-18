"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LikesDao_1 = __importDefault(require("../daos/LikesDao"));
/**
 * @class LikesController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/likes :retrieve all tuits liked by a user
 *     </li>
 *     <li>GET /tuits/:tid/likes :retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /users/:uid/likes/:tid :record that a user likes a tuit
 *     </li>
 *     <li>DELETE /users/:uid/unlikes/:tid :record that a user unliked tuit</li>
 *     <li> GET /tuits/:tid/likes/count :retrieve total number of likes on a tuit </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
class LikesController {
    constructor() {
        /**
         * Retrieves all users that liked a tuit from the database
         * @param {Request} req Represents client request: includes the path
         * parameter tid representing the tuit id of liked tuit
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findUsersThatLikedTuit = (req, res) => LikesController.likesDao.findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Retrieves all tuits liked by a user from the database
         * @param {Request} req Represents client request: includes the path
         * parameter uid representing the users that liked the tuits
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects that were liked
         */
        this.findTuitsUserLiked = (req, res) => LikesController.likesDao.findTuitsUserLiked(req.params.uid)
            .then(likes => res.json(likes));
        /**
         * Increments the likes count on a tuit.
         * @param {Request} req Represents client request: includes the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new likes that was inserted in the
         * database
         */
        this.userLikesTuit = (req, res) => LikesController.likesDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));
        /**
         * Decrements the likes count on a tuit
         * @param {Request} req Represents client request: includes the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new likes that was inserted in the
         * database
         */
        this.userUnlikesTuit = (req, res) => LikesController.likesDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
        /**
         * Get the count of likes on  a tuit.
         * @param {Request} req Represents client request: includes the
         * path parameters uid and tid representing the user that is liking the tuit
         * and the tuit being liked
         * @param {Response} res Represents response to client, includes the total count.
         */
        this.findTuitLikesCount = (req, res) => LikesController.likesDao.findTuitLikesCount(req.params.tid)
            .then(likes => res.json(likes));
    }
}
exports.default = LikesController;
LikesController.likesDao = LikesDao_1.default.getInstance();
LikesController.likesController = null;
LikesController.getInstance = (app) => {
    if (LikesController.likesController === null) {
        LikesController.likesController = new LikesController();
        app.get("/users/:uid/likes", LikesController.likesController.findTuitsUserLiked);
        app.get("/tuits/:tid/likes", LikesController.likesController.findUsersThatLikedTuit);
        app.post("/users/:uid/likes/:tid", LikesController.likesController.userLikesTuit);
        app.delete("/users/:uid/unlikes/:tid", LikesController.likesController.userUnlikesTuit);
        app.get("/tuits/:tid/likes/count", LikesController.likesController.findTuitLikesCount);
    }
    return LikesController.likesController;
};
;
