const mongoose = require("mongoose");

const whatsappSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
});

const whatsappModel = mongoose.model("messagecontent", whatsappSchema);
module.exports = whatsappModel;
