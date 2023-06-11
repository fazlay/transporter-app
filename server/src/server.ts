const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const uri =
  'mongodb+srv://admin:admin@cluster0.a4iwm.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db('cargo-app');
    const usersCollection = database.collection('users');
    const orderssCollection = database.collection('orders');
    app.post('/sign-up', async (req, res) => {
      const userInfo = req.body;

      const result = await usersCollection.insertOne(userInfo);
      if(result?.acknowledged){
        res.send(result).status(200);
      }else{
        res.send({error: 'Something went wrong'}).status(400);
      }
    
  
    });
    app.post('/sign-in', async (req, res) => {
      const userInfo = req.body;
      const email = userInfo.email;
      const password = userInfo.pass;
      const query = { email: email};
      const user = await usersCollection.findOne(query);
      if(user){
        if(user.pass === password){
          res.send(user);
        }
        else{
          res.send({error: 'Password is incorrect'});
        }
      }
  
    });

    app.post('/manufacturer-post-order', async (req, res) => {
      const orderInfo = req.body;
      const result = await orderssCollection.insertOne(orderInfo);
      if(result?.acknowledged){
        res.send(result).status(200);
      }else{
        res.send({error: 'Something went wrong'}).status(400);
      }
    });
    app.put('/manufacturer-post-order', async (req, res) => {
      const orderInfo = req.body;
      const filter = { orderId: orderInfo._id };
      const updateDoc = { $set: { price: orderInfo.price} };
      const result = await orderssCollection.updateOne(filter, updateDoc);
      if(result?.acknowledged){
        res.send(result).status(200);
      }else{
        res.send({error: 'Something went wrong'}).status(400);
      }
    });
    app.get('/manufacturer-post-order', async (req, res) => {
      const query = { manufaturer: req.query.transporter };
      const result = await orderssCollection.find(query).toArray();
      res.send(result)})

    app.get('/transporter-post-order', async (req, res) => {
      const query = { transporter: req.query.transporter };
      const result = await orderssCollection.find(query).toArray();
      res.send(result)})

      app.get('/transporter', async (req, res) => {
        const query = { role: "Transporter" };
        const result = await usersCollection.find(query).toArray();
        res.send(result)})
 



 

  } finally {
  }
}
run().catch();

app.get('/', (req, res) => {
  res.send('Server is Running');
});

app.listen(port, () => {
  console.log('Running Server at port', port);
});
