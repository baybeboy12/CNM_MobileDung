import mongoose from "mongoose";
const privateMessengerSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PrivateMessenger = mongoose.model(
  "PrivateMessenger",
  privateMessengerSchema
);
module.exports = PrivateMessenger;
