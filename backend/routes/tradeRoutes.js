const express = require('express');
const router = express.Router();

const { HoldingModel } = require('../model/HoldingsModel');
const { PositionModel } = require('../model/PositionModel');
const { WatchlistModel } = require('../model/WatchlistModel');
const { OrderModel } = require('../model/OrdersModel');
const { TransactionModel } = require('../model/TransactionModel');
const authMiddleware = require('../util/authMiddleware');

// Get user specific holdings
router.get('/allHoldings', authMiddleware, async (req, res) => {
    try {
        let allHoldings = await HoldingModel.find({ userId: req.user._id });
        res.json(allHoldings);
    } catch (err) {
        console.error('Error fetching holdings:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user specific positions
router.get('/allPositions', authMiddleware, async (req, res) => {
    try {
        let allPositions = await PositionModel.find({ userId: req.user._id });
        res.json(allPositions);
    } catch (err) {
        console.error('Error fetching positions:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user specific watchlist
router.get('/allWatchlist', authMiddleware, async (req, res) => {
    try {
        let allWatchlist = await WatchlistModel.find({ userId: req.user._id });
        res.json(allWatchlist);
    } catch (err) {
        console.error('Error fetching watchlist:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get user specific orders
router.get('/allOrders', authMiddleware, async (req, res) => {
    try {
        let allOrders = await OrderModel.find({ userId: req.user._id });
        res.json(allOrders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create user specific order with dynamic matching
router.post('/newOrder', authMiddleware, async (req, res) => {
    try {
        const { instrument, exchange, type, qty, price, status, time, typeClass, statusClass } = req.body;
        
        // Parse quantity. Handles "10 / 10" format or simple integer.
        const parsedQty = parseInt(String(qty).split('/')[0].trim(), 10) || 1;
        const parsedPrice = parseFloat(price) || 0;
        const totalValue = parsedQty * parsedPrice;

        // Default to CNC (Delivery) if not specified (since we modify frontend to pass it)
        const productType = req.body.productType || "CNC";

        const user = req.user;

        if (type === "BUY") {
            // Check if user has enough balance
            if (user.balance < totalValue) {
                return res.status(400).json({ error: "Insufficient available margin. Please add funds." });
            }

            // Deduct from balance
            user.balance = Number((user.balance - totalValue).toFixed(2));
            await user.save();

            // Create Order
            const newOrder = new OrderModel({
                userId: user._id,
                instrument,
                exchange,
                type,
                qty: `${parsedQty} / ${parsedQty}`,
                price: parsedPrice.toFixed(2),
                status: "Executed",
                time,
                typeClass: "buy",
                statusClass: "executed",
            });
            await newOrder.save();

            if (productType === "CNC") {
                // Update Holdings
                const existingHolding = await HoldingModel.findOne({ userId: user._id, name: instrument });
                if (existingHolding) {
                    const newQty = existingHolding.qty + parsedQty;
                    const newAvg = (existingHolding.qty * existingHolding.avg + parsedQty * parsedPrice) / newQty;
                    existingHolding.qty = newQty;
                    existingHolding.avg = Number(newAvg.toFixed(2));
                    existingHolding.ltp = parsedPrice;
                    existingHolding.curVal = Number((newQty * parsedPrice).toFixed(2));
                    existingHolding.pl = Number((existingHolding.curVal - (newQty * existingHolding.avg)).toFixed(2));
                    existingHolding.chg = (existingHolding.pl >= 0 ? "+" : "") + ((existingHolding.pl / (newQty * existingHolding.avg)) * 100).toFixed(2) + "%";
                    existingHolding.type = existingHolding.pl >= 0 ? "positive" : "negative";
                    await existingHolding.save();
                } else {
                    await HoldingModel.create({
                        userId: user._id,
                        name: instrument,
                        desc: req.body.desc || `${instrument} Stocks`,
                        qty: parsedQty,
                        avg: parsedPrice,
                        ltp: parsedPrice,
                        curVal: totalValue,
                        pl: 0,
                        chg: "+0.00%",
                        type: "positive"
                    });
                }
            } else {
                // Update Positions (MIS)
                const existingPosition = await PositionModel.findOne({ userId: user._id, name: instrument, product: "MIS" });
                if (existingPosition) {
                    const newQty = existingPosition.qty + parsedQty;
                    const newAvg = (existingPosition.qty * existingPosition.avg + parsedQty * parsedPrice) / newQty;
                    existingPosition.qty = newQty;
                    existingPosition.avg = Number(newAvg.toFixed(2));
                    existingPosition.ltp = parsedPrice;
                    existingPosition.pl = Number((newQty * (parsedPrice - existingPosition.avg)).toFixed(2));
                    existingPosition.type = existingPosition.pl >= 0 ? "positive" : "negative";
                    await existingPosition.save();
                } else {
                    await PositionModel.create({
                        userId: user._id,
                        name: instrument,
                        desc: req.body.desc || `${instrument} Stocks`,
                        product: "MIS",
                        qty: parsedQty,
                        avg: parsedPrice,
                        ltp: parsedPrice,
                        pl: 0,
                        type: "positive"
                    });
                }
            }
            return res.json({ message: "Order placed successfully", user });
        } else if (type === "SELL") {
            if (productType === "CNC") {
                // Check holdings
                const existingHolding = await HoldingModel.findOne({ userId: user._id, name: instrument });
                if (!existingHolding || existingHolding.qty < parsedQty) {
                    return res.status(400).json({ error: `You do not hold enough shares of ${instrument} to sell.` });
                }

                // Deduct from holdings
                const newQty = existingHolding.qty - parsedQty;
                if (newQty === 0) {
                    await HoldingModel.deleteOne({ _id: existingHolding._id });
                } else {
                    existingHolding.qty = newQty;
                    existingHolding.ltp = parsedPrice;
                    existingHolding.curVal = Number((newQty * parsedPrice).toFixed(2));
                    existingHolding.pl = Number((existingHolding.curVal - (newQty * existingHolding.avg)).toFixed(2));
                    existingHolding.chg = (existingHolding.pl >= 0 ? "+" : "") + ((existingHolding.pl / (newQty * existingHolding.avg)) * 100).toFixed(2) + "%";
                    existingHolding.type = existingHolding.pl >= 0 ? "positive" : "negative";
                    await existingHolding.save();
                }

                // Add to balance
                user.balance = Number((user.balance + totalValue).toFixed(2));
                await user.save();

                // Create Order
                const newOrder = new OrderModel({
                    userId: user._id,
                    instrument,
                    exchange,
                    type,
                    qty: `${parsedQty} / ${parsedQty}`,
                    price: parsedPrice.toFixed(2),
                    status: "Executed",
                    time,
                    typeClass: "sell",
                    statusClass: "executed",
                });
                await newOrder.save();
            } else {
                // MIS Sell
                const existingPosition = await PositionModel.findOne({ userId: user._id, name: instrument, product: "MIS" });
                if (existingPosition) {
                    const newQty = existingPosition.qty - parsedQty;
                    if (newQty === 0) {
                        await PositionModel.deleteOne({ _id: existingPosition._id });
                    } else {
                        existingPosition.qty = newQty;
                        existingPosition.ltp = parsedPrice;
                        existingPosition.pl = Number((newQty * (parsedPrice - existingPosition.avg)).toFixed(2));
                        existingPosition.type = existingPosition.pl >= 0 ? "positive" : "negative";
                        await existingPosition.save();
                    }
                } else {
                    // Create short-sell Position (negative qty)
                    await PositionModel.create({
                        userId: user._id,
                        name: instrument,
                        desc: req.body.desc || `${instrument} Stocks`,
                        product: "MIS",
                        qty: -parsedQty,
                        avg: parsedPrice,
                        ltp: parsedPrice,
                        pl: 0,
                        type: "positive"
                    });
                }

                // Add to balance
                user.balance = Number((user.balance + totalValue).toFixed(2));
                await user.save();

                // Create Order
                const newOrder = new OrderModel({
                    userId: user._id,
                    instrument,
                    exchange,
                    type,
                    qty: `${parsedQty} / ${parsedQty}`,
                    price: parsedPrice.toFixed(2),
                    status: "Executed",
                    time,
                    typeClass: "sell",
                    statusClass: "executed",
                });
                await newOrder.save();
            }
            return res.json({ message: "Order placed successfully", user });
        }
    } catch (err) {
        console.error('Error placing order:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Funds API endpoints
router.get('/getFunds', authMiddleware, async (req, res) => {
    try {
        const transactions = await TransactionModel.find({ userId: req.user._id }).sort({ _id: -1 });
        res.json({
            balance: req.user.balance,
            openingBalance: req.user.openingBalance,
            usedMargin: req.user.usedMargin,
            transactions
        });
    } catch (err) {
        console.error("Error fetching funds:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/addFunds', authMiddleware, async (req, res) => {
    try {
        const { amount, paymentMethod } = req.body;
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const user = req.user;
        user.balance = Number((user.balance + amt).toFixed(2));
        await user.save();

        const txId = Math.floor(100000000 + Math.random() * 900000000);
        const newTx = new TransactionModel({
            userId: user._id,
            type: "Funds Added",
            desc: paymentMethod === "UPI" ? `UPI Transaction ID: ${txId}` : `Netbanking Ref ID: ${txId}`,
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
            amount: `+₹${amt.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            status: "Success",
            typeClass: "add",
            statusClass: "success",
        });
        await newTx.save();

        const transactions = await TransactionModel.find({ userId: user._id }).sort({ _id: -1 });
        res.json({
            balance: user.balance,
            openingBalance: user.openingBalance,
            usedMargin: user.usedMargin,
            transactions
        });
    } catch (err) {
        console.error("Error adding funds:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/withdrawFunds', authMiddleware, async (req, res) => {
    try {
        const { amount } = req.body;
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt <= 0) {
            return res.status(400).json({ error: "Invalid amount" });
        }

        const user = req.user;
        const availableCash = user.balance - user.usedMargin;
        if (amt > availableCash) {
            return res.status(400).json({ error: "Insufficient available margin for withdrawal" });
        }

        user.balance = Number((user.balance - amt).toFixed(2));
        await user.save();

        const newTx = new TransactionModel({
            userId: user._id,
            type: "Withdrawal Requested",
            desc: "Transfer to Linked Bank Account",
            date: new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
            amount: `-₹${amt.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`,
            status: "Success",
            typeClass: "withdraw",
            statusClass: "success",
        });
        await newTx.save();

        const transactions = await TransactionModel.find({ userId: user._id }).sort({ _id: -1 });
        res.json({
            balance: user.balance,
            openingBalance: user.openingBalance,
            usedMargin: user.usedMargin,
            transactions
        });
    } catch (err) {
        console.error("Error withdrawing funds:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/resetFunds', authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        user.balance = 482910.45;
        user.openingBalance = 450000.00;
        user.usedMargin = 120400.00;
        await user.save();

        await TransactionModel.deleteMany({ userId: user._id });
        const defaultTransactions = [
            {
                userId: user._id,
                type: "Funds Added",
                desc: "UPI Transaction ID: 412290811",
                date: "Oct 24, 2023, 10:45 AM",
                amount: "+ ₹ 25,000.00",
                status: "Success",
                typeClass: "add",
                statusClass: "success",
            },
            {
                userId: user._id,
                type: "Withdrawal Requested",
                desc: "Transfer to HDFC Bank (xxxx8812)",
                date: "Oct 22, 2023, 03:12 PM",
                amount: "- ₹ 12,000.00",
                status: "Pending",
                typeClass: "withdraw",
                statusClass: "pending",
            },
            {
                userId: user._id,
                type: "Funds Added",
                desc: "Netbanking ID: 90012234",
                date: "Oct 20, 2023, 11:20 AM",
                amount: "+ ₹ 7,910.45",
                status: "Success",
                typeClass: "add",
                statusClass: "success",
            },
        ];
        await TransactionModel.insertMany(defaultTransactions);

        const transactions = await TransactionModel.find({ userId: user._id }).sort({ _id: -1 });
        res.json({
            balance: user.balance,
            openingBalance: user.openingBalance,
            usedMargin: user.usedMargin,
            transactions
        });
    } catch (err) {
        console.error("Error resetting funds:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
