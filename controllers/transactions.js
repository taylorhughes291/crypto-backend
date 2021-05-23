const Wallet = require("../models/wallet")
const Transaction = require("../models/transaction")
const {Router} = require('express')
const router = Router()

// //Get Index route
// router.get('/:id', async (req, res) => {
//     const wallets = await Wallet.findById(req.params.id)
//     res.json({
//         status: 200,
//         data: wallets
//     })
// })

// Post route
router.post('/', async (req, res) => {
    const transactionBody = req.body.transaction
    const walletBody = req.body.wallet
    const newTransaction = await Transaction.create(transactionBody)
    isBoughtCoin = walletBody.coins.some((item, index) => {
        return (newTransaction.coinBought === item.coin)
    })
    let newCoins = []
    if (isBoughtCoin) {
        newCoins = walletBody.coins.map((item, index) => {
            if (item.coin === transactionBody.coinSold) {
                return ({
                    "coin": item.coin,
                    "amount": item.amount - transactionBody.soldAmount
                })
            } else if (item.coin === transactionBody.coinBought) {
                return ({
                    "coin": item.coin,
                    "amount": item.amount + transactionBody.boughtAmount
                })
            } else {
                return(
                    item
                )
            }
        })
    } else {
        walletBody.coins.push({
            "coin": transactionBody.coinBought,
            "amount": transactionBody.boughtAmount
        })
        newCoins = walletBody.coins.map((item, index) => {
            if (item.coin === transactionBody.coinSold) {
                return ({
                    "coin": item.coin,
                    "amount": item.amount - transactionBody.soldAmount
                })
            } else {
                return (
                    item
                )
            }
        })
    }
    await Wallet.findByIdAndUpdate(walletBody._id, {$set: {coins: newCoins}, $push: {transactions: newTransaction._id}})
    console.log(newTransaction._id)
    res.json({
        status: 200,
        message: "successfully exchanged coins"
    })
})

//Put route for updating Crypto

//export
module.exports = router