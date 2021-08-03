const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Wallet schema
const walletSchema = new Schema ({
    name: String,
	user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
	coins: {type: [{
        coin: String,
        amount: Number
    }],
        default: [{
            coin: "USD",
            amount: 1000
        }]},
	transactions: [{
        ref: 'Transaction',
        type: mongoose.Schema.Types.ObjectId
    }]
}, {timestamps: true})

//Publish the model
const Wallet = mongoose.model('Wallet', walletSchema)

//export the model
module.exports = Wallet