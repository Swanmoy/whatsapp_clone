const express = require("express");

const app = express();
const port = process.env.port || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("Error Connecting to Database: " + err);
  });
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1387921",
  key: "c605530d5c2f615b6493",
  secret: "e592b25faf1ef6ef1ff3",
  cluster: "ap2",
  useTLS: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose Database Connected successfully");
  const msgCollection = connection.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});
const messageRoute = require("./Routes/messages.route.js");
const userRoute = require("./Routes/user.route.js");
app.use(messageRoute);
app.use(userRoute);
app.listen(port, () => {
  console.log(`The app is listening to port- ${port}`);
});
