const jwt = require("jsonwebtoken")


const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            const payload = await jwt.verify(token, process.env.TOKEN_SECRET)

            if (payload) {
                req.payload = payload
                next()
            } else {
                res.status(400).json({error: "VERIFICATION FAILED OR NO PAYLOAD"})
            }
        } else {
            res.status(400).json({error: "NO AUTHORIZATION HEADER"})
        }
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports = auth