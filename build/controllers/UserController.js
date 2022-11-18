"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class UserController Implements RESTful Web service API for users resource.
 * HTTP endpoints defined :
 * <ul>
 *     <li>POST /users :create a new user instance</li>
 *     <li>GET /users :retrieve users instances</li>
 *     <li>GET /users/:userid :retrieve individual user instance </li>
 *     <li>PUT /users/:userid :modify individual user instance </li>
 *     <li>DELETE /users/:userid :remove specified user instance</li>
 *     <li>DELETE /users/username/:username :remove specified user instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
class UserController {
    constructor(app, userDao) {
        /**
       * Fetches all users from database and returns an array of users.
       * @param {Request} req Represents client request.
       * @param {Response} res Represents response to client - includes the
       * body formatted as JSON arrays containing the user objects.
       */
        this.findAllUsers = (req, res) => this.userDao.findAllUsers()
            .then(users => res.json(users));
        /**
       * Fetches the user by their primary key.
       * @param {Request} req Represents client request: includes path.
       * parameter uid identifying the primary key of the user to be retrieved
       * @param {Response} res Represents response to client: includes the
       * body formatted as JSON and contains user that matched userid.
       */
        this.findUserById = (req, res) => this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));
        /**
        * Creates a new user instance
        * @param {Request} req Represents client request: includes body
        * containing JSON object for user to be addded to database.
        * @param {Response} res Represents response to client: the
        * body formatted as JSON and contains the new user that got inserted in
        * database
        */
        this.createUser = (req, res) => this.userDao.createUser(req.body)
            .then(user => res.json(user));
        /**
       * Removes a user instance from the database
       * @param {Request} req Represents client request: includes path
       * parameter uid - the primary key of the user to be removed.
       * @param {Response} res Represents response to client: includes status
       * on whether deletion successful or not.
       */
        this.deleteUser = (req, res) => this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));
        /**
       * Modifies an existing user instance.
       * @param {Request} req Represents client request: includes path
       * parameter uid - primary key of the user to be modified.
       * @param {Response} res Represents response to client: includes status
       * on whether update successful or not.
       */
        this.updateUser = (req, res) => this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
        /**
         * Removes a user instance from the database
         * @param {Request} req Represents client request: includes path
         * parameter uid - the primary key of the user to be removed.
         * @param {Response} res Represents response to client: includes status
         * on whether deletion successful or not.
         */
        this.deleteUsersByUsername = (req, res) => this.userDao.deleteUsersByUsername(req.params.username)
            .then(status => res.json(status));
        /**
         * Finds a user instance from the database
         * @param {Request} req Represents client request: includes path
         * parameter uid - the primary key of the user to be removed.
         * @param {Response} res Represents response to client: includes status
         * on whether deletion successful or not.
         */
        this.findUsersByUsername = (req, res) => this.userDao.findUsersByUsername(req.params.username)
            .then(status => res.json(status));
        this.app = app;
        this.userDao = userDao;
        this.app.get('/users', this.findAllUsers);
        this.app.get('/users/:userid', this.findUserById);
        this.app.post('/users', this.createUser);
        this.app.delete('/users/:userid', this.deleteUser);
        this.app.put('/users/:userid', this.updateUser);
        this.app.delete('/users/username/:username', this.deleteUsersByUsername);
    }
}
exports.default = UserController;
