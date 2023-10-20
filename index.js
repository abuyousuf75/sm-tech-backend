const express = require('express');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// midware
app.use(express.json());
app.use(cors());

// strat app


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7f8g7nk.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // for products brand
   const allBrandCollections = client.db('brandsDB').collection('brand')
    // for products items

   //all read methods

   // find one
    // app.get('/brand', async (req,res) =>{
    //    const cursor = allBrandCollections.find();
    //    const result = await cursor.toArray();
    //   res.send(result)
    // })

    // // find all
    app.get('/brand/:brand', async (req, res) => {
      const brand = req.params.brand;
      const query = { brand: brand };
      const result = await allBrandCollections.findOne(query);
      res.send(result);
    });
    



    // all creat method
    app.post('/brand',async(req,res) =>{
      const newProducts = req.body;
      const result = await allBrandCollections.insertOne(newProducts);
      res.send(result);
    })

    

  
   

 
   

   


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);


app.get('',(req,res) =>{
    res.send('sm tech server runningg...')
})

app.listen(port,() =>{
    console.log(`port is running on ${port}`)
})