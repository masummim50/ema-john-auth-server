const express =  require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.msj15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.json());
app.use(cors());


client.connect(err => {
  const collection = client.db("emaJohnDatabase").collection("products");
  // perform actions on the collection object
  app.post('/addproducts', (req, res)=> {
    const product = req.body;
    collection.insertMany(product)
    .then(result => {
      console.log(result.insertedCount)
    })
  })

  app.get('/products', (req,res)=> {
    collection.find({})
    .toArray((error, documents)=> {
      res.send(documents)
    })
  })

  app.get('/product/:key', (req, res)=> {
    collection.find({key: req.params.key})
    .toArray((error, documents)=> {
      res.send(documents[0])
    })
  })


});


const homepage = `<a href="https://warm-tor-58630.herokuapp.com/products" target="_blank"><button>All products</button></a><br></br> <a href="https://warm-tor-58630.herokuapp.com/product/B00I8BIBCW" target="_blank"><button>Product by keys</button></a>`



app.get('/', (req, res)=> {
  res.send(homepage)
})


app.listen(process.env.PORT || 5000)