const Wallet = require('../models/wallet');
const Network = require('../models/network');
const User = require('../models/user');
const Account = require('../models/account');
const Currency = require('../models/currency');

const mongoose = require('mongoose');
const Web3 = require("web3");
const ethNetwork = process.env.RINKEBY;
const { ethers } = require("ethers");
const ExternalTransaction = require('../models/externalTransaction');
const { query } = require('express');
const ObjectId = mongoose.Types.ObjectId;
const RippleAPI = require('ripple-lib').RippleAPI
const xrpl = require("xrpl")
const { payments, networks } = require('bitcoinjs-lib');
const ECPair = require('ecpair').ECPairFactory(require('tiny-secp256k1'));
var Tx = require('ethereumjs-tx');
const tokenAbi = require('../config/abi')

// @route GET admin/wallet
// @desc Returns all wallets
// @access Public
exports.index = async function (req, res) {
    const wallets = await Wallet.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $project: {
                name: 1,
                address: 1,
                'users.firstName': 1,
                'users.lastName': 1,
                'users.username': 1,
                'users.email': 1,
                'users.roleId': 1,
                'users.isVerified': 1
            }
        },
        { $unwind: '$users' }
    ])
    res.status(200).json({ success: true, message: "List of wallets", wallets })
};

// @route POST api/wallet/add
// @desc Add a new wallet
// @access Public
exports.store = async (req, res) => {
    try {
        // Save the updated wallet object
        const newWallet = new Wallet({ ...req.body });
        const wallet_ = await newWallet.save();
        res.status(200).json({ success: true, message: "Wallet created successfully", wallet_ })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
};

// @route GET api/wallet/{id}
// @desc Returns a specific wallet
// @access Public
exports.show = async function (req, res) {

    const wallet = await Wallet.aggregate([
        {
            $match: {
                _id: ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $limit: 1
        },
    ])
    res.status(200).json({ success: true, message: "List of users associated with wallet", wallet })
};

// @route PUT api/wallet/{id}
// @desc Update wallet details
// @access Public
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;
        const wallet = await Wallet.findByIdAndUpdate(id, { $set: update }, { new: true });
        if (!req.file) return res.status(200).json({ wallet, message: 'Wallet has been updated' });
        const wallet_ = await Wallet.findByIdAndUpdate(id, { $set: update }, { $set: { profileImage: result.url } }, { new: true });
        if (!req.file) return res.status(200).json({ wallet: wallet_, message: 'Wallet has been updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        await Wallet.findByIdAndDelete(id);
        res.status(200).json({ message: 'Wallet has been deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getWallet = async function (req, res) {
    try {
        const wallet = await Wallet.findOne({ userId: req.params.id, networkId: req.body.network }, 'address')
        if (wallet) return res.status(200).json({ success: true, message: "Wallet fetched successfully", wallet })
        else return res.status(200).json({ success: false, message: "Wallet not found" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getETHWalletTransactions = async function (req, res) {
    try {
        const networks = await Network.findOne({ symbol: 'ETH' }, 'name, symbol');
        const query = {
            "$and": [
                {
                    "networkId": { $in: networks }
                }
            ]
        }
        const wallet = await Wallet.find(query, 'address')
        let provider = new ethers.providers.EtherscanProvider('rinkeby');
        let getHistoryPromises = []
        let transactionData = []

        if (wallet && wallet.length > 0 && provider) {
            wallet.forEach((item, index) => {
                getHistoryPromises.push(
                    provider.getHistory(item.address)
                        .then(res => {
                            if (res && res.length > 0) {
                                transactionData.push(res)
                            }
                        })
                        .catch(err => {
                            console.log("getETHWalletTransactions err", err)
                        })
                )
            })
            Promise.all(getHistoryPromises)
                .then(async (res) => {
                    if (transactionData && transactionData.length > 0) {
                        for (let i = 0; i < transactionData[0].length; i++) {
                            let extTrans = await ExternalTransaction.findOne({ txHash: transactionData[0][i].hash })
                            const wallet = await Wallet.findOne({ address: transactionData[0][i].to }).select({ "userId": 1 });
                            if (!extTrans) {
                                let insertExternalTransaction = new ExternalTransaction({
                                    userId: wallet.userId,
                                    fromAddress: transactionData[0][i].from,
                                    toAddress: transactionData[0][i].to,
                                    txHash: transactionData[0][i].hash,
                                    blockNumber: transactionData[0][i].blockNumber,
                                    amount: await ethers.utils.formatEther(transactionData[0][i].value),
                                    gasPrice: await ethers.utils.formatEther(transactionData[0][i].gasPrice),
                                    gasLimit: await ethers.utils.formatEther(transactionData[0][i].gasLimit),
                                    currency: 'ETH',
                                    transactionTime: transactionData[0][i].timestamp,
                                    isResolved: false,
                                    transactionType: 0 //inbound
                                })
                                const saveExternalTransaction = await insertExternalTransaction.save();
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log('getETHWalletTransactions err: ', err)
                })
        }
        res.status(500).json({ message: "Completed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBTCWalletTransactions = async function (req, res) {
    try {
        const networks = await Network.findOne({ symbol: 'BTC' }, 'name, symbol');
        const query = {
            "$and": [
                {
                    "networkId": { $in: networks }
                }
            ]
        }
        const wallet = await Wallet.find(query, 'address')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getXRPWalletTransactions = async function (req, res) {
    try {
        const networks = await Network.findOne({ symbol: 'XRP' }, 'name, symbol');
        const query = {
            "$and": [
                {
                    "networkId": { $in: networks }
                }
            ]
        }
        const wallet = await Wallet.find(query, ['address', 'userId'])
        let live = process.env.NETWORK_LIVE;

        let api = new RippleAPI({
            server: live == 1 ? 'wss://s1.ripple.com' : 'wss://s.altnet.rippletest.net:51233'
        })

        api.connect().then(() => {
            const serverInfo = api.getServerInfo();

            const serverInfoData = serverInfo.then((data) => {
                const ledgers = data.completeLedgers.split('-');

                const ledgerVersionRange = {
                    minLedgerVersion: Number(ledgers[0]),
                    maxLedgerVersion: Number(ledgers[1])
                };

                return ledgerVersionRange;
            });
            if (wallet && wallet.length > 0) {
                wallet.forEach((item, index) => {
                    let transactionList = serverInfoData.then((ledgerVersionRange) => {
                        return transactions = api.getTransactions(item.address, ledgerVersionRange);
                    });

                    transactionList.then((transactions) => {
                        if (transactions != []) {
                            transactions.forEach(async (transactionData, index) => {
                                // check each transactionData
                                // {
                                //     type: 'payment',
                                //     address: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
                                //     sequence: 3724780,
                                //     id: 'B0513A0DAB3785039CFB80B708B03FE738460448DE4880A3079F21EE38B2C037',
                                //     specification: { source: [Object], destination: [Object] },
                                //     outcome: {
                                //       result: 'tesSUCCESS',
                                //       timestamp: '2022-04-13T07:08:30.000Z',
                                //       fee: '0.000012',
                                //       balanceChanges: [Object],
                                //       orderbookChanges: {},
                                //       ledgerVersion: 26892585,
                                //       indexInLedger: 2,
                                //       deliveredAmount: [Object]
                                //     }
                                // }
                                let extTrans = await ExternalTransaction.findOne({ txHash: transactionData.id })
                                if (!extTrans) {
                                    let insertData = {
                                        userId: item.userId,
                                        fromAddress: transactionData.address,
                                        toAddress: item.address,
                                        txHash: transactionData.id,
                                        amount: transactionData?.outcome?.deliveredAmount?.value,
                                        gasPrice: transactionData?.outcome?.fee,
                                        currency: 'XRP',
                                        transactionTime: new Date(transactionData?.outcome?.timestamp).getTime(),
                                        isResolved: false,
                                        transactionType: 0 //inbound
                                    }
                                    let insertExternalTransaction = new ExternalTransaction(insertData)
                                    const saveExternalTransaction = await insertExternalTransaction.save();
                                }
                            })
                        }
                    });
                })
            }

        });
        res.status(500).json({ message: "Completed" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.resolveAccountTransactions = async function (req, res) {
    const transactions = await ExternalTransaction.find({ isResolved: false, transactionType: 0 }).select({ "toAddress": 1, "currency": 1, "amount": 1 });
    if (transactions && transactions.length > 0) {
        try {
            for (let i = 0; i < transactions.length; i++) {
                const address = transactions[i].toAddress;
                const currency_symbol = transactions[i].currency;
                const currency = await Currency.findOne({ symbol: currency_symbol });
                const wallet = await Wallet.findOne({ address: address }).select({ "networkId": 1, "userId": 1, "_id": 0 });
                const userId = wallet.userId;
                const account = await Account.findOne({ userId: userId })
                account.amounts.find(row => row.currencyId.toString() == currency._id.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == currency._id.toString()).amount) + parseFloat(transactions[i].amount);
                account.save();
                transactions[i].isResolved = true;
                transactions[i].save();
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    return res.status(200).json({ message: 'Completed' });
}

exports.createUserWallet = async (req, res) => {
    const networkId = req.body.network;
    const userId = req.body.user;
    const network = await Network.findOne({ _id: networkId })
    const user = await User.findOne({ _id: userId })
    if (user && network && network.symbol == 'ETH') {
        // Creating ETH Wallet
        try {
            const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
            let ethAccount = web3.eth.accounts.create(web3.utils.randomHex(32));
            let ethWallet = web3.eth.accounts.wallet.add(ethAccount);
            const address = ethWallet.address;
            const secret = ethWallet.privateKey;

            if (network) {
                const newWallet = await new Wallet({ userId: userId, address: address, privateKey: secret, networkId: networkId, name: user.firstName + "'s " + network.symbol + " Wallet" });
                const newWalletSave = await newWallet.save();
                return res.status(200).json({ success: true, message: "Wallet created successfully", wallet: { address: newWallet.address } });
            }
        }
        catch (e) {
            console.log("ETH Connection Error!", e);
        }
    }
    let live = process.env.NETWORK_LIVE;
    if (user && network && network.symbol == 'BTC') {
        // Creating BIT Wallet
        try {
            const { net } = live ? { net: networks.bitcoin } : { net: networks.testnet };
            let keyPair = ECPair.makeRandom({ network: net });
            let { address } = payments.p2pkh({ pubkey: keyPair.publicKey, network: net });
            const secret = keyPair.toWIF();

            if (network) {
                const newWallet = await new Wallet({ userId: userId, address: address, privateKey: secret, networkId: networkId, name: user.firstName + "'s " + network.symbol + " Wallet" });
                const newWalletSave = await newWallet.save();
                return res.status(200).json({ success: true, message: "Wallet created successfully", wallet: { address: newWallet.address } });
            }
        } catch (error) {
            console.log("Bitcoin Connection Error!", error);
        }
    }

    if (user && network && network.symbol == 'XRP') {
        // Creating Ripple Wallet
        try {
            let address = '';
            let secret = '';
            let api = new RippleAPI({
                server: live == 1 ? 'wss://s1.ripple.com' : 'wss://s.altnet.rippletest.net:51233'
            })
            if (live) {
                let account = await api.generateAddress()
                address = account.address
                secret = account.secret
            } else {
                await api.connect()
                let ripple_wallet = await api.generateFaucetWallet()
                const account = ripple_wallet.account
                address = account.address
                secret = account.secret
                api.disconnect();
            }

            if (network) {
                const newWallet = await new Wallet({ userId: userId, address: address, privateKey: secret, networkId: networkId, name: user.firstName + "'s " + network.symbol + " Wallet" });
                const newWalletSave = await newWallet.save();
                return res.status(200).json({ success: true, message: "Wallet created successfully", wallet: { address: newWallet.address } });
            }
        } catch (error) {
            console.log("Ripple Connection Error!", error);
        }
    }
    if (!user)
        return res.status(401).json({ message: 'Network not found' });

    if (!network)
        return res.status(401).json({ message: 'Network not found' });

    return res.status(401).json({ message: 'There was a problem creating the wallet' });
}

const transferAllETHToAdminWallet = async () => {
    try {
        const networks = await Network.findOne({ symbol: 'ETH' });
        const query = {
            "$and": [
                {
                    "networkId": { $in: networks }
                }
            ]
        }
        const wallets = await Wallet.find(query)
        let provider = new ethers.providers.EtherscanProvider('rinkeby');
        const adminWallet = await Wallet.findOne({ userId: ObjectId('624c04c17b1291e3b1f9b2fc'), networkId: networks._id })
        const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));
        const currency = await Currency.findOne({ symbol: 'ETH' })

        if (wallets && wallets.length > 0 && provider) {
            wallets.filter(row => row.address != adminWallet.address).forEach(async wallet => {
                console.log("wallet", wallet);
                // get addr balance.
                let gasPrice = await web3.eth.getGasPrice();
                let balance = await web3.utils.fromWei((await web3.eth.getBalance(wallet.address)).toString())
                console.log("gasPrice: ", gasPrice);
                console.log("bal: ", balance);
                console.log("final: ", (((21000 * 0.00001) * 0.000000001) + parseFloat(balance)));
                // return
                if (balance > 0 && balance > (parseFloat('21000') * 0.000000001)) {
                    console.log("bal:", balance);
                    const nonce = await web3.eth.getTransactionCount(wallet.address, 'latest');
                    let coin = await web3.utils.toWei((parseFloat(balance)).toFixed(5).toString(), "ether")
                    let estimate = await web3.eth.estimateGas({
                        "from": wallet.address,
                        "nonce": nonce,
                        "to": adminWallet.address,
                        'value': coin.toString(),
                        // 'gas': '21000'
                    });
                    console.log("transferring:", parseFloat(balance));
                    // console.log("withdrawing:", balance - ((parseFloat('21000') * (100 + 10)) * 0.00000000106))
                    // const transaction = {
                    //     'to': adminWallet.address,
                    //     'value': (parseFloat(coin) - parseFloat(21000)).toString(),
                    //     'gas': '21000'
                    // };
                    var transaction = {
                        nonce: nonce,
                        gasPrice: gasPrice,
                        gasLimit: '0xc340',
                        to: adminWallet.address,
                        value: coin.toString(),
                        gas: '21000'
                    }

                    console.log("transaction", transaction);
                    // return
                    const signedTx = await web3.eth.accounts.signTransaction(transaction, wallet.privateKey);
                    console.log("signed");
                    await web3.eth.sendSignedTransaction(signedTx.rawTransaction, async function (error, hash) {
                        if (!error) {
                            // update data in External transations table.
                            let insertExternalTransaction = new ExternalTransaction({
                                userId: adminWallet.userId,
                                fromAddress: wallet.address,
                                toAddress: transaction.to,
                                txHash: hash,
                                amount: transaction.value.toString(),
                                gasPrice: transaction.gas,
                                currency: currency.symbol,
                                isResolved: true,
                                transactionType: 1 //outbound
                            })
                            const saveExternalTransaction = await insertExternalTransaction.save();
                            // subtract amount from user's account
                            const account = await Account.findOne({ userId: adminWallet.userId })
                            account.amounts.find(row => row.currencyId.toString() == currency._id.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == currency._id.toString()).amount) + parseFloat(transaction.value);
                            account.save();
                            // return res.status(200).json({ message: "YAYY! The hash of your transaction is: " + hash + "\n Check Alchemy's Mempool to view the status of your transaction!" });
                        } else {
                            // return res.status(500).json({ message: "OPSS! Something went wrong while submitting your transaction:" + error });
                        }
                    });
                    // transfer balance to admin 
                    console.log("transferred");
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}


const transferAllXRPToAdminWallet = async () => {
    try {
        let live = process.env.NETWORK_LIVE;
        const networks = await Network.findOne({ symbol: 'XRP' });
        const query = {
            "$and": [
                {
                    "networkId": { $in: networks }
                }
            ]
        }
        const wallets = await Wallet.find(query)
        const adminWallet = await Wallet.findOne({ userId: ObjectId('624c04c17b1291e3b1f9b2fc'), networkId: networks._id })

        const currency = await Currency.findOne({ symbol: 'XRP' })

        let api = new RippleAPI({
            server: live == 1 ? 'wss://s1.ripple.com' : 'wss://s.altnet.rippletest.net:51233'
        })

        await api.connect();
        console.log("wallets:", wallets);

        if (wallets && wallets.length > 0) {
            wallets.filter(row => row.address != adminWallet.address).forEach(async (wallet, index) => {
                // get addr balance.
                console.log("wallet:", wallet);
                let balance = 0;
                await api.getAccountInfo(wallet.address).then(info => {
                    console.log("info:", info);
                    balance = info.xrpBalance - 1;
                });
                // return
                if (balance > 0) {

                    // Ripple payments are represented as JavaScript objects
                    const payment = {
                        source: {
                            address: wallet.address,
                            maxAmount: {
                                value: balance.toString(),
                                currency: 'XRP'
                            }
                        },
                        destination: {
                            address: adminWallet.address,
                            amount: {
                                value: balance.toString(),
                                currency: 'XRP'
                            }
                        }
                    };

                    try {
                        // Get ready to submit the payment
                        const prepared = await api.preparePayment(wallet.address, payment, {
                            maxLedgerVersionOffset: 5
                        });

                        // Sign the payment using the sender's secret
                        const { signedTransaction } = api.sign(prepared.txJSON, wallet.privateKey);

                        // Submit the payment
                        const resp = await api.submit(signedTransaction);
                        api.disconnect();
                        // add data to External transations table.
                        let insertExternalTransaction = new ExternalTransaction({
                            userId: adminWallet.userId,
                            fromAddress: wallet.address,
                            toAddress: adminWallet.address,
                            txHash: resp.tx_json.hash,
                            amount: balance.toString(),
                            gasPrice: (parseFloat(resp.tx_json.Fee) * 0.000001).toString(),
                            currency: currency.symbol,
                            isResolved: true,
                            transactionType: 1 //outbound
                        })
                        const saveExternalTransaction = await insertExternalTransaction.save();
                        // subtract amount from user's account
                        const account = await Account.findOne({ userId: adminWallet.userId })
                        account.amounts.find(row => row.currencyId.toString() == currency._id.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == currency._id.toString()).amount) + parseFloat(balance);
                        account.save();
                        console.log("done");
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

function financialMfil(numMfil) {
    return Number.parseFloat(numMfil / 1e3).toFixed(3);
}

const transferAllUSDTToAdminWallet = async () => {
    try {
        let live = process.env.NETWORK_LIVE;
        const networks = await Network.findOne({ symbol: 'ETH' });
        const query = {
            "$and": [
                {
                    "networkId": { $in: networks }
                }
            ]
        }
        const wallets = await Wallet.find(query)
        // let provider = new ethers.providers.EtherscanProvider('rinkeby');
        const adminWallet = await Wallet.findOne({ userId: ObjectId('624c04c17b1291e3b1f9b2fc'), networkId: networks._id })
        const currency = await Currency.findOne({ symbol: 'USDT' })

        const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

        let contractAddress = live == 1 ? "0xdac17f958d2ee523a2206206994597c13d831ec7" : "0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad";
        let contract = await new web3.eth.Contract(tokenAbi, contractAddress)

        if (wallets && wallets.length > 0) {
            wallets.filter(row => row.address != adminWallet.address).forEach(async (wallet, index) => {
                // get addr balance.
                // console.log("wallet:", wallet);
                var count = await web3.eth.getTransactionCount(wallet.address);
                // How many tokens do I have before sending?
                // console.log("count:", count);
                var balance = await contract.methods.balanceOf(wallet.address).call();
                balance = financialMfil(balance)
                // console.log("bal:", balance);
                if (balance > 0) {

                    // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
                    // Use Gwei for the unit of gas price
                    var gasPriceGwei = 3;
                    var gasLimit = 3000000;
                    // Chain ID of Ropsten Test Net is 3, replace it to 1 for Main Net
                    var chainId = live ? 1 : 3;
                    // console.log("ummm:");
                    let gass = web3.utils.toHex(gasPriceGwei * 1e9);
                    // console.log("ummm:");
                    var rawTransaction = {
                        "from": wallet.address,
                        "nonce": "0x" + count.toString(16),
                        "gasPrice": gass,
                        "gasLimit": web3.utils.toHex(gasLimit),
                        "to": contractAddress,
                        "value": "0x0",
                        "data": contract.methods.transfer(adminWallet.address, (parseFloat(balance) - parseFloat(gass))).encodeABI(),
                        "chainId": chainId
                    };

                    console.log("wallet:", wallet);
                    console.log("rawTransaction:", rawTransaction);
                    // The private key for myAddress in .env
                    var privKey = wallet.privateKey;
                    var tx = new Tx(rawTransaction);
                    tx.sign(privKey);
                    var serializedTx = tx.serialize();

                    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), async function (error, hash) {
                        if (!error) {
                            // update data in External transations table.
                            let insertExternalTransaction = new ExternalTransaction({
                                userId: adminWallet.userId,
                                fromAddress: wallet.address,
                                toAddress: adminWallet.address,
                                txHash: hash,
                                amount: balance.toString(),
                                gasPrice: gass,
                                currency: currency.symbol,
                                isResolved: true,
                                transactionType: 1 //outbound
                            })
                            const saveExternalTransaction = await insertExternalTransaction.save();
                            // subtract amount from user's account
                            const account = await Account.findOne({ userId: adminWallet.userId })
                            account.amounts.find(row => row.currencyId.toString() == currency._id.toString()).amount = parseFloat(account.amounts.find(row => row.currencyId.toString() == currency._id.toString()).amount) + parseFloat(transaction.value);
                            account.save();
                            // return res.status(200).json({ message: "YAYY! The hash of your transaction is: " + hash + "\n Check Alchemy's Mempool to view the status of your transaction!" });
                        } else {
                            // return res.status(500).json({ message: "OPSS! Something went wrong while submitting your transaction:" + error });
                        }
                    });
                    // transfer balance to admin 
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.transferAllToAdminWallet = async (req, res) => {
    await transferAllETHToAdminWallet()
    console.log("eth done");
    await transferAllUSDTToAdminWallet()
    console.log("usdt done");
    await transferAllXRPToAdminWallet()
    console.log("xrp done");
}