const mongoose = require('mongoose');


const CurrencySchema = new mongoose.Schema({

    id: Number,
    name: {
        type: String,
        required: 'Currency name is required',
        trim: true
    },
    symbol: {
        type: String,
        required: 'Currency symbol is required',
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Currency', CurrencySchema);