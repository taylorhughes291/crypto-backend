////////////////////////////////
// Boilerplate
////////////////////////////////
require("dotenv").config();
const express = require("express");
const mongoose = require("./db/connection");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { PORT=4500 } = process.env;
const NODE_ENV = "development";



////////////////////////////////
// Middleware
////////////////////////////////

app.use(express.json());
app.use(morgan("tiny")); //logging

////////////////////////////////
// Welcome route, router re-direct, and listen
////////////////////////////////

app.get("/", (req, res) => res.send({
    status: 200,
    msg: "Thank you for connecting to the Cryptos API!"
}));

const walletsRouter = require('./controllers/wallets')
app.use('/wallets', walletsRouter)

const transactionsRouter = require('./controllers/transactions')
app.use('/transactions', transactionsRouter)

app.listen(PORT, () => console.log(`port running on ${PORT}`));