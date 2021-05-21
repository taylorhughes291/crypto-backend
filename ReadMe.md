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
	name: Taylor Hughes,
	password: **********,
  mobile: 3103670287,
	email: example@aol.com
	coins: [{
			coin: BTC,
			amount: 0.23456
		},
		{
			coin: ETH,
			amount: 0.8543
		},
		{
			coin: USD,
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
	userID: 3103670287
	coinSold: BTC,
	amountSold: 0.0000543
	coinBought: ETH,
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
	email: String,
  mobile: String,
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

### Routes
| Path | Route | Method | Return |
| --- | --- | --- | --- |
| '/' | Welcome Route | GET | "Thanks for accessing the Crypto API |
| '/wallets/:id' | Wallet Index | GET | All Users and their wallets |
| '/wallets' | Wallet Create | POST | Successful status message |
| '/wallets/:id' | Wallet Update | PUT | Finds wallet by user ID and changes coins field based on what user exchanged |
| '/wallets/login/:mobile/:password' | Login Verification Route | GET | Login successful or login failed status |
| '/transactions/:id' | Transactions Index | GET | All transactions with userID :id |
| 'transactions/:id' | Transactions create route | POST | Successful status message |



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

This code snippet dynamically generates 3 cards. Im proud of it because I was able to make it work.

```
const mongoose = require 'mongoose'
```