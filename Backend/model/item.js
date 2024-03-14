const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        date: { type: Date, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);