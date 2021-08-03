const User = require("../models/users")
const {Router} = require('express')
const Transaction = require("../models/transaction")
const Wallet = require("../models/wallet")
const router = Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Seed route
router.delete('/seed', async (req, res) => {
    await User.deleteMany({})
    await Transaction.deleteMany({})
    await Wallet.deleteMany({})
    res.json({
        status: 200,
        msg: "all db entries have been deleted."
    })
})

//Get Index route
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    const transactions = await Transaction.find({userID: user._id})
    const wallet = await Wallet.find({userID: user._id})
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
    const userCheck = await User.find({username: body.username})
    if (userCheck.length !== 0) {
        res.json({
            status: 403,
            msg: "User already exists"
        })
    } else {
        try {
            const hashedPassword = await bcrypt.hash(body.password, 10)
            const user = {
                username: body.username,
                password: hashedPassword
            }
            const newUser = await User.create(user)
            const newWallet = await Wallet.create({user: newUser._id})
            res.json({
                status: 200,
                msg: "Successfully created new wallet",
                data: newWallet
            })
        } catch(e) {
            res.json({message: "Error"})
        }
    }
})

//login verification
router.get('/login/:username/:password', async (req, res) => {
    const username = req.params.username
    const password = req.params.password
    const wallet = await Wallet.findOne({username: username})
    if (wallet) {
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
    } else {
        res.json({
            status: 409,
            msg: "This user does not exist."
        })
    }
})

//export
module.exports = router