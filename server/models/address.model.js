const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  strada: {
    type: String,
    required: true,
  },

  numarStrada: {
    type: String,
    required: true,
  },

  bloc: {
    type: String,
    required: true,
  },

  scara: {
    type: String,
    required: true,
  },

  apartament: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema);
