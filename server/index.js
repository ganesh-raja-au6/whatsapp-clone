// Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Messages from "./model/messages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1073108",
  key: "59f674bc8c1cf20e8f33",
  secret: "0b5089721f3a11ca0042",
  cluster: "ap2",
  encrypted: true,
});

// Middlewares
app.use(express.json());

// DB config
mongoose
  .connect(
    "mongodb+srv://ganeshraja:ganeshraja@ganeshraja.gohkx.mongodb.net/whatsappclone?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then((res) => res)
  .catch((err) => console.log(err.message));

const db = mongoose.connection;

db.once("open", () => {
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// api routes
app.get("/api/v1/messages/sync", (req, res, next) => {
  Messages.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

app.post("/api/v1/messages/new", (req, res, next) => {
  new Messages(req.body)
    .save()
    .then((data) => res.json({ data }))
    .catch((err) => res.json({ err: err }));
});

app.get("/", (req, res) => res.status(200).json("Hello world."));

// listen
app.listen(PORT);
