const LeverageOrder = require("../models/leverageOrder");
const User = require("../models/user");
const Account = require("../models/account");
const Currency = require('../models/currency');
var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const https = require('https');
const Leverage = require("../models/leverage");

// @route GET admin/account
// @desc Returns all accounts
// @access Public
exports.index = async function (req, res) {
    try {
        const orders = await LeverageOrder.aggregate([
            {
                $match: {
                    isResolved: true
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'fromCurrency',
                    foreignField: '_id',
                    as: 'fromCurrency'
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'toCurrency',
                    foreignField: '_id',
                    as: 'toCurrency'
                }
            },
            {
                $unwind: '$fromCurrency'
            },
            {
                $unwind: '$toCurrency'
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
        ]).sort({ "created_at": -1 })
        res.status(200).json({ success: true, message: "All orders", orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route POST api/account/add
// @desc Add a new account
// @access Public
exports.store = async (req, res) => {
    try {
        const newOrder = new LeverageOrder({ ...req.body });
        const data = { ...req.body };
        let tradeEndPrice = 0;

        if (!data.tradeType) {
            //sell
            tradeEndPrice = data.tradeStartPrice - (data.tradeStartPrice * (data.userInvestedAmount / (data.leverage * data.userInvestedAmount)))
        } else {
            //buy
            tradeEndPrice = data.tradeStartPrice + (data.tradeStartPrice * (data.userInvestedAmount / (data.leverage * data.userInvestedAmount)))
        }

        newOrder.tradeEndPrice = tradeEndPrice;

        const account = await Account.findOne({ userId: data.userId })
        account.amounts.find(row => row.currencyId.toString() == data.fromCurrency.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == data.fromCurrency.toString()).amount) - parseFloat(data.userInvestedAmount);
        account.save();

        const order_ = await newOrder.save();
        res.status(200).json({ success: true, message: "Order created successfully", order_ })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route GET api/account/{id}
// @desc Returns a specific account
// @access Public
exports.show = async function (req, res) {
    try {
        const userOrders = await LeverageOrder.aggregate([
            {
                $match: {
                    userId: ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'fromCurrency',
                    foreignField: '_id',
                    as: 'fromCurrency'
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'toCurrency',
                    foreignField: '_id',
                    as: 'toCurrency'
                }
            },
            {
                $unwind: '$fromCurrency'
            },
            {
                $unwind: '$toCurrency'
            }
        ])
        res.status(200).json({ success: true, message: "User's orders", userOrders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route PUT api/account/{id}
// @desc Update account details
// @access Public
exports.update = async function (req, res) {
    try {
        res.status(200).json({ success: true, message: "Update is Pending" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.destroy = async function (req, res) {
    try {
        res.status(200).json({ success: true, message: "Delete is Pending" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRates = async function (from, to) {
    try {
        let rzlt = ''
        var url = `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}&api_key=6f8e04fc1a0c524747940ce7332edd14bfbacac3ef0d10c5c9dcbe34c8ef9913`
        await new Promise((resolve) => {
            https.get(url, res => {
                let data = '';
                res.on('data', chunk => { data = chunk })
                res.on('end', () => { rzlt = JSON.parse(data); resolve(); })
            })
        })
        return rzlt;
    } catch (error) {
        return error;
    }
}

// exports.resolveOrders = async function (req, res) {
//     try {
//         // const orders = await LeverageOrder.find({ isResolved: false }).select({ "fromCurrency": 1, "toCurrency": 1, "fromAmount": 1, "convertedAmount": 1, 'userId': 1 });

//         // orders.forEach(async (order) => {
//         //     const account = await Account.findOne({ userId: order.userId });
//         //     if (account) {
//         //         account.amounts.find(row => row.currencyId.toString() == order.fromCurrency.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == order.fromCurrency.toString()).amount) - parseFloat(order.fromAmount);
//         //         account.amounts.find(row => row.currencyId.toString() == order.toCurrency.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == order.toCurrency.toString()).amount) + parseFloat(order.convertedAmount);
//         //         account.save();

//         //         order.isResolved = true;
//         //         order.save();
//         //     }
//         // })
//         res.status(200).json({ success: true, message: "Orders Resolved", orders: [] });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.stop = async function (req, res) {
    try {
        const id = req.params.id;
        const leverageOrder = await LeverageOrder.findById(id);

        const leverage = await Leverage.findOne({ sourceCurrencyId: ObjectId(leverageOrder.fromCurrency.toString()), destinationCurrencyId: ObjectId(leverageOrder.toCurrency.toString()) });
        // return admin's amount
        let admins = (((parseFloat(leverageOrder.leverage) * parseFloat(leverageOrder.userInvestedAmount)) - parseFloat(leverageOrder.userInvestedAmount)) * parseFloat(leverageOrder.tradeStartPrice)) + parseFloat(leverage.leverageFee);
        // return user's amount
        // subtract fee as well 

        const allCurrencies = await Currency.find();
        let primaryCoin = allCurrencies.find(row => row._id.toString() == leverageOrder.fromCurrency.toString())
        let secondaryCoin = allCurrencies.find(row => row._id.toString() == leverageOrder.toCurrency.toString())
        let rates = await getRates(primaryCoin.symbol, secondaryCoin.symbol)
        let rate = rates[secondaryCoin.symbol]

        let users = (rate * (parseFloat(leverageOrder.leverage) * parseFloat(leverageOrder.userInvestedAmount))) - parseFloat(admins);
        leverageOrder.tradeProfitOrLoss = parseFloat(parseFloat(users) - (parseFloat(leverageOrder.userInvestedAmount) * parseFloat(leverageOrder.tradeStartPrice)));
        // send this to user's account (coin)
        const account = await Account.findOne({ userId: leverageOrder.userId });
        account.amounts.find(row => row.currencyId.toString() == leverageOrder.toCurrency.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == leverageOrder.toCurrency.toString()).amount) + parseFloat(users);
        account.save();

        leverageOrder.tradingFeePaid = leverage.leverageFee;
        leverageOrder.status = 3;
        leverageOrder.isResolved = true;
        leverageOrder.save();

        res.status(200).json({ success: true, message: "Order is Stopped" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const startOrder = async function (LeverageOrder) {
    try {
        LeverageOrder.status = 1;
        LeverageOrder.isResolved = true;
        LeverageOrder.save();
        // res.status(200).json({ success: true, message: "Order is Stopped" });
    } catch (error) {
        return error;
        // res.status(500).json({ message: error.message });
    }
};

const endOrder = async function (LeverageOrder, rate) {
    try {
        if (LeverageOrder.marginType == '1' || (LeverageOrder.marginType == '0' && ((parseFloat(LeverageOrder.takeProfitPrice) >= parseFloat(rate)) || (parseFloat(LeverageOrder.stopLossPrice) >= parseFloat(rate))))) { //Isolated or stop Cross
            const leverage = await Leverage.find({ sourceCurrencyId: LeverageOrder.fromCurrency, destinationCurrencyId: LeverageOrder.toCurrency });
            // return admin's amount
            let admins = (((LeverageOrder.leverage * LeverageOrder.userInvestedAmount) - LeverageOrder.userInvestedAmount) * LeverageOrder.tradeStartPrice) + leverage.leverageFee;

            // return user's amount 
            let users = (rate * (LeverageOrder.leverage * LeverageOrder.userInvestedAmount)) - admins;

            LeverageOrder.tradeProfitOrLoss = (users - (LeverageOrder.userInvestedAmount * LeverageOrder.tradeStartPrice)).toString();
            // send this to user's account (coin)
            const account = await Account.findOne({ userId: LeverageOrder.userId });
            account.amounts.find(row => row.currencyId.toString() == LeverageOrder.toCurrency.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == LeverageOrder.toCurrency.toString()).amount) + parseFloat(users);
            account.save();

            LeverageOrder.tradingFeePaid = leverage.leverageFee;
            LeverageOrder.status = 3;
            LeverageOrder.isResolved = true;
            LeverageOrder.save();

            // res.status(200).json({ success: true, message: "Order is Stopped" });
        }
        else { //Cross
            const account = await Account.findOne({ userId: LeverageOrder.userId });
            let remainingAmount = parseFloat(account.amounts.find(row => row.currencyId.toString() == LeverageOrder.fromCurrency.toString()).amount)
            let workWith = 0;
            if (remainingAmount >= parseFloat(LeverageOrder.userInvestedAmount)) {
                workWith = parseFloat(LeverageOrder.userInvestedAmount);
            }
            else {
                workWith = parseFloat(remainingAmount)
            }

            account.amounts.find(row => row.currencyId.toString() == LeverageOrder.fromCurrency.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == LeverageOrder.fromCurrency.toString()).amount) - parseFloat(workWith);
            account.save();

            let tradeEndPrice = 0;
            if (!LeverageOrder.tradeType) {
                //sell
                tradeEndPrice = rate - (rate * (workWith / (parseFloat(LeverageOrder.leverage) * workWith)))
            } else {
                //buy
                tradeEndPrice = rate + (rate * (workWith / (parseFloat(LeverageOrder.leverage) * workWith)))
            }
            LeverageOrder.tradeStartPrice = rate;
            LeverageOrder.userInvestedAmount = workWith;
            LeverageOrder.tradeEndPrice = tradeEndPrice;
            LeverageOrder.save();
        }
    } catch (error) {
        return error;
        // res.status(500).json({ message: error.message });
    }
};

const stopStartedOrders = async function (orders, allCurrencies, rates, pairs) {
    try {
        let stop = [];
        pairs.forEach(async (pair) => {
            let prim = pair.substring(0, 3)
            let sec = pair.substring(3, pair.length)
            let primaryCoin = await allCurrencies.find(row => row.symbol == prim)
            let secondaryCoin = await allCurrencies.find(row => row.symbol == sec)
            let rate = rates[prim][sec]

            // BUY
            stop = orders.filter(row => { row.fromCurrency == primaryCoin._id && row.toCurrency == secondaryCoin._id }).filter(row => { (parseFloat(row.tradeEndPrice) <= parseFloat(rate)) || (parseFloat(row.takeProfitPrice) <= parseFloat(rate)) || (parseFloat(row.stopLossPrice) <= parseFloat(rate)) });
            await stop.forEach(async (order) => {
                await endOrder(order, rate)
            })
            // SELL
            stop = orders.filter(row => { row.fromCurrency == primaryCoin._id && row.toCurrency == secondaryCoin._id }).filter(row => { (parseFloat(row.tradeEndPrice) >= parseFloat(rate)) || (parseFloat(row.takeProfitPrice) >= parseFloat(rate)) || (parseFloat(row.stopLossPrice) >= parseFloat(rate)) });
            await stop.forEach(async (order) => {
                await endOrder(order, rate)
            })
        })
    } catch (error) {
        return error;
    }
};

const startCreatedOrders = async function (orders, allCurrencies, rates, pairs) {
    try {
        let start = [];
        pairs.forEach(async (pair) => {
            let prim = pair.substring(0, 3)
            let sec = pair.substring(3, pair.length)
            let primaryCoin = await allCurrencies.find(row => row.symbol == prim)
            let secondaryCoin = await allCurrencies.find(row => row.symbol == sec)
            let rate = rates[prim][sec]

            // BUY
            start = orders.filter(row => { row.fromCurrency == primaryCoin._id && row.toCurrency == secondaryCoin._id && parseFloat(row.tradeStartPrice) >= parseFloat(rate) });
            await start.forEach(async (order) => {
                await startOrder(order)
            })
            // SELL
            start = orders.filter(row => { row.fromCurrency == primaryCoin._id && row.toCurrency == secondaryCoin._id && parseFloat(row.tradeStartPrice) <= parseFloat(rate) });
            await start.forEach(async (order) => {
                await startOrder(order)
            })
        })
    } catch (error) {
        return error;
    }
};

exports.ordersCron = async function (req, res) {
    try {
        // get all currencies
        const allCurrencies = await Currency.find();
        const pairs = ['BTCUSDT', 'XRPUSDT', 'ETHBTC', 'ETHUSDT', 'XRPETH', 'XRPBTC'];

        // get rate for each coin pair
        var fromBTC = ''
        var fromETH = ''
        var fromXRP = ''
        fromBTC = await getRates('BTC', 'USDT')
        fromETH = await getRates('ETH', 'USDT,BTC')
        fromXRP = await getRates('XRP', 'USDT,ETH,BTC')
        var rates = { 'BTC': fromBTC, 'ETH': fromETH, 'XRP': fromXRP }

        let createdorders = await LeverageOrder.find({ status: '0' });
        let startedorders = await LeverageOrder.find({ status: '1' });

        await startCreatedOrders(createdorders, allCurrencies, rates, pairs)
        await stopStartedOrders(startedorders, allCurrencies, rates, pairs)

        res.status(200).json({ success: true, message: "Orders Resolved" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route GET admin/account
// @desc Returns all accounts
// @access Public
exports.userOrders = async function (req, res) {
    try {
        const orders = await LeverageOrder.aggregate([
            {
                $match: {
                    userId: ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'fromCurrency',
                    foreignField: '_id',
                    as: 'fromCurrency'
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'toCurrency',
                    foreignField: '_id',
                    as: 'toCurrency'
                }
            },
            {
                $unwind: '$fromCurrency'
            },
            {
                $unwind: '$toCurrency'
            }
        ]).sort({ "created_at": -1 })
        res.status(200).json({ success: true, message: "All orders", orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getPendingOrders = async function (req, res) {
    try {
        const orders = await LeverageOrder.aggregate([
            {
                $match: {
                    isResolved: { $ne: true }
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'fromCurrency',
                    foreignField: '_id',
                    as: 'fromCurrency'
                }
            },
            {
                $lookup: {
                    from: 'currencies',
                    localField: 'toCurrency',
                    foreignField: '_id',
                    as: 'toCurrency'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $unwind: '$fromCurrency'
            },
            {
                $unwind: '$toCurrency'
            }
        ]).sort({ "created_at": -1 })
        res.status(200).json({ success: true, message: "All orders", orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};