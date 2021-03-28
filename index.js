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






app.get('/', (req, res)=> {
  res.send('server running')
})


app.listen(process.env.PORT || 5000)