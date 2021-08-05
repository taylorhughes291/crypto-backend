const Wallet = require("../models/wallet")
const {Router} = require('express')
const Transaction = require("../models/transaction")
const router = Router()
const auth = require("../auth");
const jwt = require("jsonwebtoken")


//get wallet
router.get('/', auth, async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const payload = await jwt.verify(token, process.env.TOKEN_SECRET)
    const wallet = await Wallet.findOne({user: payload._id})
    const transactions = await Transaction.find({userID: payload._id})
    res.json({
        status: 200,
        data: {
            wallet: wallet,
            transactions: transactions
        }
    })
})

//export
module.exports = router