var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const axios = require("axios");

exports.getMarketData = async (req, res) => {
    return new Promise(function (resolve, reject) {
        try {
            let allPromises = [];
            let prices = [];
            let symbols = ['BTCUSDT', 'XRPUSDT', 'ETHBTC', 'ETHUSDT', 'XRPETH', 'XRPBTC']
            symbols.forEach(item => {
                allPromises.push(axios.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${item}`))
            })
            Promise.all(allPromises)
                .then(async (res) => {
                    for (let i = 0; i < res.length; i++) {
                        prices.push(res[i].data)
                    }
                    res = prices
                    return resolve(res)
                })
                .catch(err => {
                    // console.log('allPromises err: ', err)
                })
        } catch (e) {
            return res.status(500).json({ success: false, message: "Something went wrong" })
        };
    });
};