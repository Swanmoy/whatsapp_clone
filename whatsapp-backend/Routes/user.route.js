const User = require("../Schema/user.schema.js");

const router = require("express").Router();

router.route("/user/add").post((req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  newUser
    .save()
    .then(() => res.status(201).json({ message: "User Created" }))
    .catch((err) => res.status(404).json({ error: err }));
});

router.route("/user/login").get((req, res) => {
  User.findOne({ username: req.query.username })
    .then((user) => {
      if (user.password === req.query.password) {
        res.status(200).json({ verification: "verified" });
      } else {
        res.status(200).json({ verification: "failed" });
      }
    })
    .catch((err) => {
      res.status(404).json({ verification: "User does not exist" });
    });
});

module.exports = router;
