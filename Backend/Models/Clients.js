const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  password: {
    type: String,
  },
  project: {
    type: String,
  },
});
const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
