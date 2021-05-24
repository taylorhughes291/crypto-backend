const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Transaction schema
const transactionSchema = new Schema ({
	userID: {
        ref: 'Wallet',
        type: mongoose.Schema.Types.ObjectId},
	coinSold: String,
	soldAmount: Number,
	coinBought: String,
	boughtAmount: Number
}, {timestamps: true})

//Publish the model
const Transaction = mongoose.model('Transaction', transactionSchema)

//export the model
module.exports = Transaction