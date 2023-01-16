const mongoose = require('mongoose');


const LeverageSchema = new mongoose.Schema({

    id: Number,
    sourceCurrencyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Currency',
        required: 'Leverage Source Currency is required',
    },
    destinationCurrencyId: {
        type: mongoose.Types.ObjectId,
        ref: 'Currency',
        required: 'Leverage Destination Currency is required',
    },
    leverage: {
        type: String,
        required: 'Leverage is required',
        trim: true
    },
    leverageFee: {
        type: String,
        required: 'Leverage fee is required',
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Leverage', LeverageSchema);