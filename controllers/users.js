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


// Post route - Create Account
router.post('/', async (req, res) => {
    const body = req.body
    console.log(body);
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
                password: hashedPassword,
                name: body.name
            }
            const newUser = await User.create(user)
            await Wallet.create({user: newUser._id})
            const accessToken = await jwt.sign(JSON.stringify(newUser), process.env.TOKEN_SECRET)
            res.json({
                status: 200,
                accessToken,
                userID: newUser._id
            })
        } catch(e) {
            console.log(e);
            res.json({message: "Error"})
        }
    }
})

//login verification
router.get('/login/:username/:password', async (req, res) => {
    const username = req.params.username
    const password = req.params.password
    const user = await User.findOne({username: username})
    try {
        if (user) {
            const match = await bcrypt.compare(password, user.password)
            const accessToken = await jwt.sign(JSON.stringify(user), process.env.TOKEN_SECRET)
            if (match) {
                res.json({
                    accessToken,
                    status: 200,
                    userID: user._id
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
    } catch(e) {
        console.log(e);
    }
})

//export
module.exports = router