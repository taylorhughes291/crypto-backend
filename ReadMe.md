# Project Overview

## Project Links
- [UX/UI COMP](https://www.behance.net/gallery/119211101/UIUX-Design-Cryptocurrency-payment-application?tracking_source=search_projects_recommended%7Cux%20case%20study)

- [API URL with key](https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=c5d6dda1-a1ed-43ac-9a0c-6f4d7e6227a6)

- [ Frontend github repo link](https://github.com/BPdg06/cryptoApp_frontend/tree/dev)
- [Frontend deployment link](https://mystifying-villani-51e1b2.netlify.app/)

- [ Backend github repo link](https://github.com/taylorhughes291/crypto-backend/tree/dev)
- [ Backend deployment link](https://crypto-backend-project3.herokuapp.com/)

## Project Description

Developing a paper trading Crypto Currency Trading App for those who wish they had money to put into crypto but dont. 

## Backend API

From the returned data we will be able to see the some of the data depending on the endpoints. We will have two collections, users and transactions. They will be displayed as follows as examples:


```
 "wallets":
{
	name: "Taylor Hughes",
	password: "**********",
    username: "taylorhughes291",
	coins: [{
			coin: "BTC",
			amount: 0.23456
		},
		{
			coin: "ETH",
			amount: 0.8543
		},
		{
			coin: "USD",
			amount: 20.34
		}],
	transactions: [
				746352,
				837435,
				948363
			]
}
```

```
 "transactions":
{
	_id: 746352,
	userID: "3103670287",
	coinSold: "BTC",
	amountSold: 0.0000543
	coinBought: "ETH",
	amountBought: 0.546222
	Date: 05/15/21 4:35 PM
}

```

and below is the schema:
```
 "wallets":
{
	name: String,
	password: String,
	username: String,
	coins: [
    {
      coin: String,
      amount: Number
    }
  ],
	transactions: [
    Number
  ]
}
```
```
 "transactions":
{
	_id: MongoID,
	userID: MongoID,
	coinSold: String,
	soldAmount: Number
	coinBought: String,
	boughtAmount: Number,
	Date: Date
}

```

## Routes
| # | Path | Route | Method | Return |
| --- | --- | --- | --- | --- |
| 1 | '/' | Welcome Route | GET | "Thanks for accessing the Crypto API |
| 2 | '/wallets/:id' | Wallet Index | GET | All Users and their wallets |
| 3 | '/wallets' | Wallet Create | POST | Successful status message |
| 4 | '/wallets/login/:mobile/:password' | Login Verification Route | GET | Login successful or login failed status |
| 5 | '/transactions' | Transactions create route | POST | Successful status message |


## Route Responses
Please see the below for the expected outputs of backend route responses.
### 2. wallets/:id GET Index Route
#### Case: Return all information
When submitting url + /ID/ you should only get one type of response. You will receive all wallet and transaction information in the following format:
```
{
    "status": 200,
    "data": {
        "wallet": {
            "transactions": [
                "60abd213474e5e060ebb5f49"
            ],
            "_id": "60abd1f9474e5e060ebb5f47",
            "name": "Taylor Hughes",
            "password": "password1234",
            "username": "taylorhughes291",
            "coins": [
                {
                    "_id": "60abd213474e5e060ebb5f4a",
                    "coin": "USD",
                    "amount": 200
                },
                {
                    "_id": "60abd213474e5e060ebb5f4b",
                    "coin": "BTC",
                    "amount": 0.005
                }
            ],
            "createdAt": "2021-05-24T16:19:05.826Z",
            "updatedAt": "2021-05-24T16:19:31.284Z",
            "__v": 0
        },
        "transactions": [
            {
                "_id": "60abd213474e5e060ebb5f49",
                "userID": "60abd1f9474e5e060ebb5f47",
                "coinSold": "USD",
                "soldAmount": 400,
                "coinBought": "BTC",
                "boughtAmount": 0.0025,
                "createdAt": "2021-05-24T16:19:31.278Z",
                "updatedAt": "2021-05-24T16:19:31.278Z",
                "__v": 0
            }
        ]
    }
}
```

### 3. wallet create POST request
#### Case 1: User does not already exist
In the successful case of the user not already existing, you will be returned a normal status 200 response with a message saying that the user has been successfully created. You will also receive the wallet data, although I don't believe it will be used since a useEffect for the Get Index route will be implemented upon redirect to App.js. Regardless, the data looks as follows:
```
{
    "status": 200,
    "msg": "Successfully created new wallet",
    "data": {
        "transactions": [],
        "_id": "60abd4cc474e5e060ebb5f4c",
        "name": "Taylor Hughes",
        "password": "password1234",
        "username": "taylorhughes291",
        "coins": [
            {
                "_id": "60abd4cc474e5e060ebb5f4d",
                "coin": "USD",
                "amount": 1000
            }
        ],
        "createdAt": "2021-05-24T16:31:08.595Z",
        "updatedAt": "2021-05-24T16:31:08.595Z",
        "__v": 0
    }
}
```
#### Case 2: Username already exists
In the case that the user already exists in the database, the following response will be given:
```
{
    "status": 403,
    "msg": "User already exists"
}
```

### 4. Wallets - login verification route
#### Case 1: Username exists and password is correct
In the case that the user exists amd the password is correct in the database, the following status 200 will be returned:
```
{
    "status": 200,
    "data": {
        "wallet": {
            "transactions": [],
            "_id": "60abd4cc474e5e060ebb5f4c",
            "name": "Taylor Hughes",
            "password": "password1234",
            "username": "taylorhughes291",
            "coins": [
                {
                    "_id": "60abd4cc474e5e060ebb5f4d",
                    "coin": "USD",
                    "amount": 1000
                }
            ],
            "createdAt": "2021-05-24T16:31:08.595Z",
            "updatedAt": "2021-05-24T16:31:08.595Z",
            "__v": 0
        },
        "transactions": []
    }
}
```

#### Case 2: Username does not exist
In the case that the username doesn't exist, you will be returned a status 409 as follows: 
```
{
    "status": 409,
    "msg": "This user does not exist."
}
```

#### Case 3: Password is incorrect
In the case that the username exists and the password is incorrect you will be returned the following status 403 code:
```
{
    "status": 403,
    "msg": "You have entered an incorrect password."
}
```
### 5. Transactions POST route
#### Case 1: Transaction complete
There will only be one case for this, although there is an expectation that the front-end will check the forms to make sure that the user has enough coin to cover any sell. In any case this will be the response:
```
{
    "status": 200,
    "message": "successfully exchanged coins"
}
```

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP EXAMPLE
- Wallet - displays portfolio balance, crypto balance.
- Charts - displays 1h, 24h, 1wk, 1mo, 1yr
- Form - Login, search 



#### PostMVP EXAMPLE

- JWT

## Components
##### Writing out your components and its descriptions isn't a required part of the proposal but can be helpful.

Based on the initial logic defined in the previous sections try and breakdown the logic further into stateless/stateful components. 

| Component | Description | 
| --- | :---: |  
| App | This will make the initial data pull and include React Router| 
| Header | This will render the header include the nav in tablet and desktop media queries| 
| Footer | This will render the header include the nav for mobile only | 
| Cards | This is where the relevant crytpo will be displayed.| 


Time frames are also key in the development cycle.  You have limited time to code all phases of the game.  Your estimates can then be used to evalute game possibilities based on time needed and the actual time you have before game must be submitted. It's always best to pad the time by a few hours so that you account for the unknown so add and additional hour or two to each component to play it safe. Also, put a gif at the top of your Readme before you pitch, and you'll get a panda prize.

| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Working with API | H | 5hrs| hrs | hrs |
| Working with Nav | H | 5hrs| hrs | hrs |
| Styling | H | 5hrs | hrs | hrs |
| Bulding Base App structure| H | 5hrs | hrs | hrs |
| PostMVP Stuff| L | 4hrs | hrs | hrs |
| Project Planning | H | hrs | hrs | hrs- |
| Backend | H | 3hrs | .5hrs | hrs |
| Total | H | 38hrs| hrs | hrs |

## Additional Libraries
Reactstrap
As of now. may grow or change at the flow of the project.

## Code Snippet

This code snippet takes a crypto transaction and updates both the transactions collection and the wallet collection. Im proud of it because It's the most complex data manipulation I've done on the backend so far. I had to check if the coin bought is already in the wallet or not, that way I could update the total amount if the coin that the user has. It also links the wallet and transactions collections by ID.

```
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
```


