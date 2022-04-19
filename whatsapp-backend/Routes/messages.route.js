const messageContent = require("../Schema/messages.schema.js");

const router = require("express").Router();
router.route("/message/add").post((req, res) => {
  const message = req.body.message;
  const name = req.body.name;
  const timestamp = new Date().toUTCString();
  const newMessage = new messageContent({ message, name, timestamp });
  newMessage
    .save()
    .then(() => {
      res.status(200).json({ message: "Message added Successfully" });
    })
    .catch((err) => {
      res.status(404).json({ error: err });
    });
});
router.route("/messages").get((req, res) => {
  messageContent
    .find()
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

module.exports = router;
