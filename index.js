const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    
    // for products brand
   const allProductsCollections = client.db('brandsDB').collection('products');
   const BProductsCollections = client.db('brandsDB').collection('pBrands');
  const userCollections = client.db('brandsDB').collection('user');
  const cartCollections = client.db('brandsDB').collection('cart');
    // for READ or get
    
   

    // for all products and find spacapic product
    app.get('/products/:brand',async(req,res) =>{
      const brand = req.params.brand;
      const query = {brand : brand } 
      const cursor = allProductsCollections.find(query)
      const result = await cursor.toArray()
      res.send(result);
  })

  
   
   


  app.get('/products/:brand/:id', async(req,res) =>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await allProductsCollections.findOne(query);
      res.send(result)
  })
   
 
   
 
  app.get('/details',async(req,res) =>{
      const curosr = allProductsCollections.find();
      const products = await curosr.toArray();
      res.send(products)
  })

  app.get('/myCart/:email',async(req,res) =>{
      const email = req.params.email;
      const curosr = cartCollections.find({email});
      const cartItems= await curosr.toArray();
      res.send(cartItems)
  })

  app.delete('/myCart/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await cartCollections.deleteOne(query);
      res.send(result)
  })


//   app.get('/details/:id', async(req,res) =>{
//     const id = req.params.id;
//     const query = {_id : new ObjectId(id)};
//     const result = await allProductsCollections.findOne(query);
//     res.send(result)
// })


  //for update products

  app.put('/products/:brand/:id', async(req,res) =>{
    const id = req.params.id;
    const filter = {_id : new ObjectId(id)};
    const options = {upsert: true};
    const updateProducts = req.body;
    const update = {
      $set : {
        name:updateProducts.name, 
        ratting:updateProducts.ratting, 
        brand:updateProducts.brand, 
        price:updateProducts.price, 
        category:updateProducts.category, 
        details:updateProducts. details,
        photo : updateProducts.photo
      }

    }
    const result = await allProductsCollections.updateOne(filter,update, options)
    res.send(result)
  })




    app.get('/pBrands',async(req,res) =>{
      const cursor =   BProductsCollections.find();
      const result = await cursor.toArray();
    res.send(result)
  })

   // gt users
   app.get('/users', async(req,res)=>{
      const cursor = userCollections.find();
      const result = await cursor.toArray();
      res.send(result)
   })

   // for CRETE or post all 

   // for brans 


   // for all products details route
   app.post('/products',async(req,res) =>{
  const allProducts = req.body;
  const result = await  allProductsCollections.insertOne(allProducts);
  res.send(result)
  
   })

  // for cart

  app.post('/myCart', async (req,res) => {
    const cartItems = req.body;
    cartItems.productId = cartItems._id;
    delete cartItems._id;
    const result = await cartCollections.insertOne(cartItems);
    res.send(result)
  })
 
  
   // for users
   app.post('/user',async(req,res) =>{
    const allUsers = req.body;
    const result = await userCollections.insertOne(allUsers);
    res.send(result)
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