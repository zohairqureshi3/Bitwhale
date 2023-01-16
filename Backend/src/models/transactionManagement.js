const mongoose = require('mongoose');

const transactionManagementSchema = new mongoose.Schema({
    
    id: Number,
    currencyId: {
        type: mongoose.Types.ObjectId,
        required: 'Currency Id is required',
        trim: true
    },
    fee: {
        type: Number,
        required: 'Fee is required',
        trim: true
    },
    status:{
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('TransactionManagement', transactionManagementSchema);