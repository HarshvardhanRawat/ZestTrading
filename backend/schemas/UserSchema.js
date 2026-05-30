const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Your Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Your Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Your Password is required"],
        minlength: 6
    },
    balance: {
        type: Number,
        default: 482910.45
    },
    openingBalance: {
        type: Number,
        default: 450000.00
    },
    usedMargin: {
        type: Number,
        default: 120400.00
    },
});

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = UserSchema;