"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements an Express Node HTTP server.
 */
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const TuitDao_1 = __importDefault(require("./daos/TuitDao"));
const FollowsController_1 = __importDefault(require("./controllers/FollowsController"));
const LikesController_1 = __importDefault(require("./controllers/LikesController"));
const MessagesController_1 = __importDefault(require("./controllers/MessagesController"));
const BookmarksController_1 = __importDefault(require("./controllers/BookmarksController"));
const auth_controller_1 = __importDefault(require("./controllers/auth-controller"));
const express_session_1 = __importDefault(require("express-session"));
mongoose_1.default.connect('mongodb://localhost:27017/Tuiter');
// const userName = process.env.USERNAME;
// const password = process.env.PASSWORD;
// const url = `mongodb+srv://${userName}:${password}@cluster0.f6urgn7.mongodb.net/Tuiter?retryWrites=true&w=majority`;
// mongoose.connect(url)
const cors = require('cors');
const app = (0, express_1.default)();
//app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
// app.use(express.json());
let sess = {
    secret: 'process.env.SECRET',
    cookie: {
        secure: false
    }
};
if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.use(cors(corsOptions));
app.use((0, express_session_1.default)(sess));
app.use(express_1.default.json());
const userController = new UserController_1.default(app, new UserDao_1.default());
const tuitController = new TuitController_1.default(app, new TuitDao_1.default());
(0, auth_controller_1.default)(app);
FollowsController_1.default.getInstance(app);
LikesController_1.default.getInstance(app);
BookmarksController_1.default.getInstance(app);
MessagesController_1.default.getInstance(app);
app.get('/', (req, res) => res.send('Welcome to Foundation of Software Engineering!!!!'));
// let sess = {
//     secret: 'process.env.EXPRESS_SESSION_SECRET',
//     saveUninitialized: true,
//     resave: true,
//     cookie: {
//       sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
//       secure: process.env.NODE_ENV === "production",
//       // secure: false
//     }
//   }
// app.get('/hello', (req: Request, res: Response) =>
//     res.send('Welcome to Foundation of Software Engineering!'));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
