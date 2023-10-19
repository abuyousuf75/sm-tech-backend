const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// midware
app.use(express.json());
app.use(cors());

// strat app

app.get('',(req,res) =>{
    res.send('sm tech server runningg...')
})

app.listen(port,() =>{
    console.log(`port is running on ${port}`)
})