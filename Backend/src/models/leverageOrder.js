const mongoose = require('mongoose');
const LeverageOrderSchema = new mongoose.Schema({

    id: Number,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    marginType: {
        type: Boolean, // 0=cross, 1=isolated
        required: true,
        default: false
    },
    tpsl: {
        type: Boolean, // 0=false, 1=true
        required: true,
        default: false
    },
    tradeType: {
        type: Boolean, // 1=buy, 0=sell
        required: true,
        default: false
    },
    marketOrder: {
        type: Boolean, // 1=market, 0=limit
        required: true,
        default: false
    },
    fromCurrency: {
        type: mongoose.Types.ObjectId,
        ref: 'Currency',
        required: true,
        trim: true
    },
    toCurrency: {
        type: mongoose.Types.ObjectId,
        ref: 'Currency',
        required: true,
        trim: true
    },
    tradeStartPrice: {
        type: String,
        required: true,
        trim: true
    },
    tradeEndPrice: {
        type: String,
        required: true,
        trim: true
    },
    takeProfitPrice: {
        type: String,
        required: false,
        trim: true
    },
    stopLossPrice: {
        type: String,
        required: false,
        trim: true
    },
    userInvestedAmount: {
        type: String,
        required: true,
        trim: true
    },
    leverage: {
        type: String,
        required: true,
        trim: true
    },
    tradeProfitOrLoss: {
        type: String,
        required: false,
        default: 0
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false
    },
    tradingFeePaid: {
        type: String,
        required: false,
    },
    // stopReason: {
    //     type: String,
    //     required: false,
    // },
    status: {
        type: String, // 0=Created, 1=Processing, 2=Completed, 3=Stopped
        required: true,
        default: true,
        trim: true
    }

}, { timestamps: true });


module.exports = mongoose.model('LeverageOrder', LeverageOrderSchema);