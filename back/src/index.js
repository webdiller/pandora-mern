const express = require("express");
const { createServer } = require("http");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");

const multer = require("./services/multer");

const UserCtrl = require("./controllers/UserController");
const DialogCtrl = require("./controllers/DialogController");
const MessageCtrl = require("./controllers/MessageController");
const UploadFileCtrl = require("./controllers/UploadController");

const { checkAuth } = require("./middlewares/checkAuth");
const { updateLastSeen } = require("./middlewares/updateLastSeen");

const { loginValidation } = require("./utils/validations/login");
const { registerValidation } = require("./utils/validations/registration");

require("dotenv").config();

mongoose
  .connect(
    process.env.DATABASE,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    },
    (err, db) => {
      console.log(`Connected to MongoDB...`);
    }
  )
  .catch((err) => {
    console.error(`Error: ${err}`);
  });
const createSocket = require("./services/socket");

const app = express();
const http = createServer(app);
const io = createSocket(http);

const UserController = new UserCtrl(io);
const DialogController = new DialogCtrl(io);
const MessageController = new MessageCtrl(io);
const UploadFileController = new UploadFileCtrl();

app.use(bodyParser.json());
// app.use(checkAuth);
app.use(updateLastSeen);
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// User Routes
app.get("/user/me", UserController.getMe);
app.get("/user/verify", UserController.verify);
app.post("/user/signup", registerValidation, UserController.create);
app.post("/user/signin", loginValidation, UserController.login);
app.get("/user/find", UserController.findUsers);
app.get("/user/:id", UserController.show);
app.delete("/user/:id", UserController.delete);

// Message Routes
app.get("/dialogs", DialogController.index);
app.delete("/dialogs/:id", DialogController.delete);
app.post("/dialogs", DialogController.create);
app.get("/messages", MessageController.index);
app.post("/messages", MessageController.create);
app.delete("/messages", MessageController.delete);

// Service Routes
const {
  CreateService,
  listService,
  listAllServiceCategories,
  readService,
  removeService,
  updateService,
  photoService,
} = require("./controllers/ServiceController");
const { requireLogin, adminMiddleware } = require("./middlewares/checkAuth");

app.post("/service", CreateService);
app.get("/service", listService);
app.post("/service-categories", listAllServiceCategories);
app.get("/service/:slug", readService);
app.delete("/service/:slug", removeService);
app.put("/service/:slug", adminMiddleware, updateService);
app.get("/service/photo/:slug", photoService);

// Category Routes
const {
  createCategory,
  listCategory,
  readCategory,
  removeCategory,
} = require("./controllers/CategoryController");

const { runValidation } = require("./utils/validations");
const { categoryCreateValidator } = require("./utils/validations/category");

app.post("/category", categoryCreateValidator, runValidation, createCategory);
app.get("/categories", listCategory);
app.get("/category/:slug", readCategory);
app.delete("/category/:slug", removeCategory);

// Upload Files Routes
app.post("/files", multer.single("file"), UploadFileController.create);
app.delete("/files", UploadFileController.delete);

const PORT = process.env.PORT || 3003;

http.listen(PORT, function () {
  console.log(`Server: http://localhost:${PORT}`);
});
