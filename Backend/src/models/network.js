const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NetworkSchema = new Schema({

    id: Number,
    name: {
        type: String,
        required: 'Network name is required',
        trim: true
    },
    symbol: {
        type: String,
        required: 'Network symbol is required',
        trim: true
    },
    currencyIds: {
        type: [mongoose.Types.ObjectId],
        ref: 'currencies',
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Network', NetworkSchema);