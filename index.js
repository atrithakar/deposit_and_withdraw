const express = require('express')
const mongoose = require('mongoose')
const app = express()

let check = undefined

const withdraw =  async(holdername, value) => {
    const result=await account.updateOne({holdername: holdername},{$inc: {deposit: -value}})

}
const deposit =  async(holdername, value) => {
    const result=await account.updateOne({holdername: holdername},{$inc: {deposit: value}})

}

mongoose.connect('mongodb://127.0.0.1:27017/DepositAndWithdraw');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connection Successful');
})

var response = new mongoose.Schema({
    holdername: String,
    deposit: Number
});
var account = mongoose.model('account', response);

const hostname = '127.0.0.1'
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})

app.post('/makeaccount', (req, res) => {
    let myData = new account(req.body)
    myData.save().then(() => {
        res.send("Account Created Successfully.")
    }).catch(() => {
        res.send("Oops! Something went wrong...")

    })
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/html/login.html')
})

app.post('/login', async (req, res) => {
    try {
        check = await account.findOne({ holdername: req.body.holdername })
        if (check.holdername === req.body.holdername) {
            res.sendFile(__dirname + '/html/home.html')
        }
        else {
            res.sendFile(__dirname + '/html/login.html')

        }
    }
    catch {
        res.send("Oops! Something went wrong...")

    }
})

app.post('/deposit', (req, res) => {
    // res.send("Depositted Successfully")
    let money = req.body.deposit
    deposit(check.holdername, money)
    res.send("Money Depositted Sucessfully!")
})
app.post('/withdraw', (req, res) => {
    // res.send("Withdrew Successfully")
    let money = req.body.withdraw
    withdraw(check.holdername, money)
    res.send("Money Withdrew Sucessfully!")
})


app.listen(port, hostname, () => {
    console.log(`Server started on http://${hostname}:${port}/`)
})