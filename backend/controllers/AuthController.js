const User = require("../model/UserModel")
const { createSecretToken } = require("../util/SecretToken")
const bcrypt = require("bcrypt");


module.exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ name, email, password });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(201).json({ message: "User created successfully", success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({ message: "User logged in successfully", success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ status: false });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.json({ status: false });
        } else {
            try {
                const user = await User.findById(data.id);
                if (user) return res.json({ status: true, user: user.name });
                else return res.json({ status: false });
            } catch (error) {
                console.error(error);
                return res.json({ status: false });
            }
        }
    });
};

module.exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "User logged out successfully", success: true });
};
