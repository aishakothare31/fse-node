"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /tuits :create a new tuit instance for
 *     a given user</li>
 *     <li>GET /tuits :retrieve tuits instances</li>
 *     <li>GET /tuits/:tid :retrieve specified tuit instances</li>
 *     <li>GET /users/:userid/tuits :retrieve tuits for a given user </li>
 *     <li>PUT /tuits/:tid :modify individual tuit instance </li>
 *     <li>DELETE /tuits/:tid :remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
class TuitController {
    constructor(app, tuitDao) {
        /**
      * Retrieves all tuits from the database and returns an array of tuits.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents client response: body formatted as JSON array
      * contains the tuit objects.
      */
        this.findAllTuits = (_req, res) => this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));
        /**
       * Retrieves tuit from the database based on the tuit id match.
       * @param {Request} req Represents client request: includes path
       * parameter tid - tuit's primary key for tuit retrival.
       * @param {Response} res Represents response to client: includes the
       * body formatted as JSON and the tuit matching the uid.
       */
        this.findTuitById = (req, res) => this.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));
        /**
       * Retrieves tuits for a particular user and returns
       * array of tuits.
       * @param {Request} req Represents client request
       * @param {Response} res Represents response to client: includes the
       * body formatted as JSON array containing tuit objects.
       */
        this.findTuitsByUser = (req, res) => {
            // let userId = req.params.uid === "me"
            //       //@ts-ignore
            //       && req.session['profile'] ?
            //       //@ts-ignore
            //       req.session['profile']._id :
            //       req.params.uid;
            this.tuitDao.findTuitsByUser(req.params.uid)
                .then((tuits) => res.json(tuits));
            //.then((tuits: Tuit[]) => res.json(tuits)).then(tuit => res.json(tuit));
        };
        /**
         * Inserts a new tuit instance in the tuits collection.
       * @param {Request} req Represents request from client, including body
       * containing the JSON object for the new tuit to be inserted in the
       * database
       * @param {Response} res Represents response to client, including the
       * body formatted as JSON containing the new tuit that was inserted in the
       * database
       */
        this.createTuit = (req, res) => {
            this.tuitDao.createTuit(req.body)
                .then((tuit) => res.json(tuit));
        };
        /**
         * Removes tuit from the database.
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteTuit = (req, res) => this.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));
        /**
       * Updates tuit with new values in database.
       * @param {Request} req Represents request from client, including path
       * parameter tid identifying the primary key of the tuit to be modified
       * @param {Response} res Represents response to client, including status
       * on whether updating a tuit was successful or not
       */
        this.updateTuit = (req, res) => this.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));
        this.createTuitByUser = (req, res) => {
            let uid = req.params.uid === "633b12c1f77b271b3fba92e7"
                //@ts-ignore
                && req.session['profile'] ?
                //@ts-ignore
                req.session['profile']._id :
                req.params.uid;
            this.tuitDao.createTuitByUser(uid, req.body)
                .then((tuit) => res.json(tuit));
        };
        this.app = app;
        this.tuitDao = tuitDao;
        app.get("/tuits", this.findAllTuits);
        app.get("/users/:userid/tuits", this.findTuitsByUser);
        app.get("/tuits/:tid", this.findTuitById);
        app.post("/tuits", this.createTuit);
        app.put("/tuits/:tid", this.updateTuit);
        app.delete("/tuits/:tid", this.deleteTuit);
        app.post("/users/:uid/tuits", this.createTuitByUser);
    }
}
exports.default = TuitController;
