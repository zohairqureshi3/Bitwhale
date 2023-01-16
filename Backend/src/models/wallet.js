const mongoose = require('mongoose');


const WalletSchema = new mongoose.Schema({

    id: Number,
    name: {
        type: String,
        required: 'Wallet name is required',
        trim: true
    },
    address: {
        type: String,
        required: 'Wallet address is required',
        trim: true
    },
    privateKey: {
        type: String,
        trim: true
    },
    networkId: {
        type: mongoose.Types.ObjectId,
        ref: 'Network',
        trim: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }

}, { timestamps: true });


module.exports = mongoose.model('Wallet', WalletSchema);