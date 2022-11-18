"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FollowsDao_1 = __importDefault(require("../daos/FollowsDao"));
/**
 * @class FollowsController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/following :retrieve users followed by a user
 *     </li>
 *     <li>GET /users/:uid/followedby :retrieve users that follow a user
 *     </li>
 *     <li>POST /users/:uid_cur/follows/:uid :record a user following another user
 *     </li>
 *     <li>DELETE /users/:uid/unfollows/:tid :record a user unfollowing another user
 *     /li>
 * </ul>
 * @property {FollowsDao} followsDao Singleton DAO implementing likes CRUD operations
 * @property {FollowsController} followsController Singleton controller implementing
 * RESTful Web service API
 */
class FollowsController {
    constructor() {
        /**
         * Adds a follow relation between two users
         * @param {Request} req Represents client request: includes the
         * path parameters uid_cur and uid representing one user following another user.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new follow that was inserted in the
         * database
        */
        this.follow = (req, res) => FollowsController.followsDao.follow(req.params.uid_cur, req.params.uid)
            .then(follows => res.json(follows));
        /**
         * Removes the follow relation between two users.
         * @param {Request} req Represents client request: includes the
         * path parameters uid_cur and uid representing the one user unfollowing another user.
         * @param {Response} res Represents response to client, including status
         * on whether unfollow was successful or not
         */
        this.unfollow = (req, res) => FollowsController.followsDao.unfollow(req.params.uid_cur, req.params.uid)
            .then(status => res.send(status));
        /**
         * Retrieves all users that follow the user specified
         * @param {Request} req Represents client request: includes the path
         * parameter uid representing the user for which all users who are following them
         * is to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the users objects that are following the user
         */
        this.findAllFollowed = (req, res) => FollowsController.followsDao.findAllFollowers(req.params.uid)
            .then(following => res.json(following));
        /**
         * Retrieves all users that the user follows
         * @param {Request} req Represents client request: includes the path
         * parameter uid representing the user for which all users they follow is to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the users objects that are followed by the user
         */
        this.findAllFollowing = (req, res) => FollowsController.followsDao.findAllFollowing(req.params.uid)
            .then(followedby => res.json(followedby));
    }
}
exports.default = FollowsController;
FollowsController.followsDao = FollowsDao_1.default.getInstance();
FollowsController.followsController = null;
FollowsController.getInstance = (app) => {
    if (FollowsController.followsController === null) {
        FollowsController.followsController = new FollowsController();
        app.get("/users/:uid/following", FollowsController.followsController.findAllFollowed);
        app.get("/users/:uid/followedby", FollowsController.followsController.findAllFollowing);
        app.post("/users/:uid_cur/follows/:uid", FollowsController.followsController.follow);
        app.delete("/users/:uid_cur/unfollows/:uid", FollowsController.followsController.unfollow);
    }
    return FollowsController.followsController;
};
