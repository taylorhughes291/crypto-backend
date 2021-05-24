const Wallet = require("../models/wallet")
const {Router} = require('express')
const Transaction = require("../models/transaction")
const router = Router()

//Get Index route
router.get('/:id', async (req, res) => {
    const wallet = await Wallet.findById(req.params.id)
    const transactions = await Transaction.find({userID: wallet._id})
    res.json({
        status: 200,
        data: {
            wallet: wallet,
            transactions: transactions
        }
    })
})

// Post route
router.post('/', async (req, res) => {
    const body = req.body
    const userCheck = await Wallet.find({mobile: body.mobile})
    if (userCheck.length !== 0) {
        res.json({
            status: 403,
            msg: "User mobile number already exists"
        })
    } else {
        const newWallet = await Wallet.create(body)
        res.json({
            status: 200,
            msg: "Successfully created new wallet",
            data: newWallet
        })
    }
})

//login verification
router.get('/login/:mobile/:password', async (req, res) => {
    const mobile = req.params.mobile
    const password = req.params.password
    const wallet = await Wallet.findOne({mobile: mobile})
    const transactions = await Transaction.find({userID: wallet._id})
    console.log(password, wallet);
    if (password === wallet.password) {
        res.json({
            status: 200,
            data: {
                wallet: wallet,
                transactions: transactions
            }
        })
    } else {
        res.json({
            status: 403,
            msg: "You have entered an incorrect password."
        })
    }

})

//export
module.exports = router