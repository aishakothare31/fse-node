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
* @file Implements DAO managing data storage of messages. Uses mongoose MessagesModel
* to integrate with MongoDB
*/
const MessagesModel_1 = __importDefault(require("../mongoose/MessagesModel"));
/**
* @class MessagesDao Implements Data Access Object managing data storage
* of messages
* @property {MessagesDao} messagesDao Private single instance of MessagesDao
*/
class MessagesDao {
    constructor() {
        /**
       * Uses MessagesModel to retrieve all messages sent from messages collection
       * @param {string} uid User whose sent messages are to be retrieved
       * @returns Promise To be notified when the messages are retrieved from
       * database
       */
        this.findMessagesSent = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessagesModel_1.default.find({ from: uid })
                .populate("message")
                .exec();
        });
        /**
       * Uses TuitModel to retrieve all messages received from messages collection
       * @param {string} uid User whose received messages are to be retrieved
       * @returns Promise To be notified when the messages are retrieved from
       * database
       */
        this.findMessagesReceived = (uid) => __awaiter(this, void 0, void 0, function* () {
            return MessagesModel_1.default.find({ to: uid })
                .populate("message")
                .exec();
        });
        /**
       * Inserts messages instance into the database
       * @param {Message} message Instance to be inserted into the database
       * @returns Promise To be notified when message is inserted into the database
       */
        this.send = (message) => __awaiter(this, void 0, void 0, function* () { return MessagesModel_1.default.create(message); });
        /**
       * Removes message from the database.
       * @param {string} mid Primary key of message to be removed
       * @returns Promise To be notified when message is removed from the database
       */
        this.unsend = (mid) => __awaiter(this, void 0, void 0, function* () { return MessagesModel_1.default.deleteOne({ _id: mid }); });
    }
}
exports.default = MessagesDao;
MessagesDao.messagesDao = null;
MessagesDao.getInstance = () => {
    if (MessagesDao.messagesDao === null) {
        MessagesDao.messagesDao = new MessagesDao();
    }
    return MessagesDao.messagesDao;
};
