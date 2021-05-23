const Wallet = require("../models/wallet")
const {Router} = require('express')
const router = Router()

//Get Index route
router.get('/:id', async (req, res) => {
    const wallets = await Wallet.findById(req.params.id)
    res.json({
        status: 200,
        data: wallets
    })
})

// Post route
router.post('/', async (req, res) => {
    const body = req.body
    const newWallet = await Wallet.create(body)
    res.json({
        status: 200,
        msg: "Successfully created new wallet",
        data: newWallet
    })
})

//login verification
router.get('/login/:mobile/:password', async (req, res) => {
    const mobile = req.params.mobile
    const password = req.params.password
    const user = Wallet.find({mobile: mobile})
    console.log(user)
})

//export
module.exports = router