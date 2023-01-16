const mongoose = require('mongoose');
const AccountSchema = new mongoose.Schema({

    id: Number,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: 'Account name is required',
        trim: true
    },
    amounts: [{
        currencyId: {
            type: mongoose.Types.ObjectId,
            ref: 'Currency',
            required: true,
        },
        amount: {
            type: String,
            required: 'Amount is required',
            trim: true
        }
    }],
    status: {
        type: Boolean,
        required: true,
        default: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Account', AccountSchema);