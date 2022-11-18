"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessagesDao_1 = __importDefault(require("../daos/MessagesDao"));
/**
 * @class MessagesController Implements RESTful Web service API for Messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /messages/:uid/send :send a new message</li>
 *     <li>GET /messages/:uid/sent :retrieve messages sent</li>
 *     <li>GET /messages/:uid/received :retrieve messages received by user </li>
 *     <li>DELETE /messages/:mid/delete :unsend a particular message</li>
 * </ul>
 * @property {MessagesDao} messageDao Singleton DAO implementing user CRUD operations
 * @property {MessagesController} messagesController Singleton controller implementing
 * RESTful Web service API
 */
class MessagesController {
    constructor() {
        /**
         * Sends out a message to a user.
         * @param {Request} req Represents client request: includes the
         * request body containing message information.
         * @param {Response} res Represents response to client, includes the
         * body formatted as JSON containing the new message that was inserted in the
         * database
         */
        this.send = (req, res) => MessagesController.messagesDao.send(req.body)
            .then(messages => res.json(messages));
        /**
         * Unsends a message already sent to a user.
         * @param {Request} req Represents client request: includes the
         * path parameters mid representing message to be unsent.
         * @param {Response} res Represents response to client, includes status
         * on whether unsend was successful or not
         */
        this.unsend = (req, res) => MessagesController.messagesDao.unsend(req.params.mid)
            .then(status => res.send(status));
        /**
         * Retrieves all messages that are sent by the user
         * @param {Request} req Represents client request: includes the path
         * parameter uid representing the user whose messages sent is to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the messages objects that are sent by the user
         */
        this.findMessagesSent = (req, res) => MessagesController.messagesDao.findMessagesSent(req.params.uid)
            .then(messages => res.json(messages));
        /**
         * Retrieves all messages that are received by the user
         * @param {Request} req Represents client request: includes the path
         * parameter uid representing the user whose messages received is to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the messages objects that are received by the user
         */
        this.findMessagesReceived = (req, res) => MessagesController.messagesDao.findMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));
    }
}
exports.default = MessagesController;
MessagesController.messagesDao = MessagesDao_1.default.getInstance();
MessagesController.messagesController = null;
MessagesController.getInstance = (app) => {
    if (MessagesController.messagesController === null) {
        MessagesController.messagesController = new MessagesController();
        app.get("/messages/:uid/sent", MessagesController.messagesController.findMessagesSent);
        app.get("/messages/:uid/received", MessagesController.messagesController.findMessagesReceived);
        app.post("/messages/:uid/send", MessagesController.messagesController.send);
        app.delete("/messages/:mid/delete", MessagesController.messagesController.unsend);
    }
    return MessagesController.messagesController;
};
