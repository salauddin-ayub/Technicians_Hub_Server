const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const uri = "mongodb+srv://ayub35265:XfovUbBKfis6X1vP@cluster0.a8pagwh.mongodb.net/?retryWrites=true&w=majority";

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
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      const collection = client.db("user").collection("users");
      const user = {
        name: "Ali Akber",
        email: "ali@gmail.com",
        phone: "09988776655",
      };
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
      await collection.insertOne(user);
      console.log("Insert Success");
    } finally {
      // Close the client only when you're done using it
      await client.close();
    }
}

app.get("/", (req, res) => {
  res.send("Hello From My first ever node");
});

app.listen(port, async () => {
    try {
        await run();
        console.log('listening to port', port);
    } catch (error) {
        console.error('Error:', error);
    }
});
