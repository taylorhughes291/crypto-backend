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
const auth = require("./auth");


////////////////////////////////
// Middleware
////////////////////////////////

NODE_ENV === "production" ? app.use(cors(corsOptions)) : app.use(cors());
app.use(express.json());
app.use(morgan("tiny")); //logging

////////////////////////////////
// Welcome route, router re-direct, and listen
////////////////////////////////

const walletsRouter = require('./controllers/wallets')
app.use('/wallets', walletsRouter)

const transactionsRouter = require('./controllers/transactions')
app.use('/transactions', transactionsRouter)

const usersRouter = require('./controllers/users')
app.use('/users', usersRouter)

app.get("/", auth, (req, res) => {
    res.json(req.payload)
})

app.listen(PORT, () => console.log(`port running on ${PORT}`));