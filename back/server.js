const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRoutes = require('./routes/product');

const uri = "mongodb+srv://dbalten:dbalten@cluster0.5fmtkmm.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    productRoutes(app);
    app.listen(PORT, () => {
        console.log(`Serveur node écoutant le port ${PORT}...`);
    });
  } finally {
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);