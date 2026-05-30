const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");
const { WatchlistModel } = require("../model/WatchlistModel");
const { HoldingModel } = require("../model/HoldingsModel");
const { PositionModel } = require("../model/PositionModel");
const { OrderModel } = require("../model/OrdersModel");
const { TransactionModel } = require("../model/TransactionModel");

const watchlistData = require("../init/WatchlistData");
const holdingData = require("../init/HoldingData");
const positionData = require("../init/PositionData");
const ordersData = require("../init/OrdersData");

const ensureUserDataSeeded = async (userId) => {
    try {
        const watchlistCount = await WatchlistModel.countDocuments({ userId });
        if (watchlistCount === 0) {
            console.log(`Seeding sample data for user: ${userId}`);

            // Seed Watchlist
            const watchlistItems = watchlistData.watchlist.map(item => ({ ...item, userId }));
            await WatchlistModel.insertMany(watchlistItems);

            // Seed Holdings
            const holdingItems = holdingData.holdings.map(item => ({ ...item, userId }));
            await HoldingModel.insertMany(holdingItems);

            // Seed Positions
            const positionItems = positionData.positions.map(item => ({ ...item, userId }));
            await PositionModel.insertMany(positionItems);

            // Seed Orders
            const orderItems = ordersData.orders.map(item => ({ ...item, userId }));
            await OrderModel.insertMany(orderItems);

            // Seed default Transactions
            const defaultTransactions = [
                {
                    type: "Funds Added",
                    desc: "UPI Transaction ID: 412290811",
                    date: "Oct 24, 2023, 10:45 AM",
                    amount: "+ ₹ 25,000.00",
                    status: "Success",
                    typeClass: "add",
                    statusClass: "success",
                },
                {
                    type: "Withdrawal Requested",
                    desc: "Transfer to HDFC Bank (xxxx8812)",
                    date: "Oct 22, 2023, 03:12 PM",
                    amount: "- ₹ 12,000.00",
                    status: "Pending",
                    typeClass: "withdraw",
                    statusClass: "pending",
                },
                {
                    type: "Funds Added",
                    desc: "Netbanking ID: 90012234",
                    date: "Oct 20, 2023, 11:20 AM",
                    amount: "+ ₹ 7,910.45",
                    status: "Success",
                    typeClass: "add",
                    statusClass: "success",
                },
            ];
            const txItems = defaultTransactions.map(item => ({ ...item, userId }));
            await TransactionModel.insertMany(txItems);

            console.log(`Successfully seeded sample data for user: ${userId}`);
        }
    } catch (error) {
        console.error("Error in ensureUserDataSeeded:", error);
    }
};

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false, message: "Unauthorized: No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).json({ status: false, message: "Unauthorized: Invalid token" });
        } else {
            try {
                const user = await UserModel.findById(data.id);
                if (user) {
                    await ensureUserDataSeeded(user._id);
                    req.user = user;
                    next();
                } else {
                    return res.status(401).json({ status: false, message: "Unauthorized: User not found" });
                }
            } catch (error) {
                console.error("Auth middleware error:", error);
                return res.status(500).json({ status: false, message: "Internal server error" });
            }
        }
    });
};

module.exports = authMiddleware;
