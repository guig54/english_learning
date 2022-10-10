const { MongoClient } = require('mongodb');
const express = require('express');
const path=require('path');
const port = process.env.PORT || 5000;
const app=express()


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Verbes';

//API
//app.use(express.static('public'))

app.get('/', async (req,res) => {

	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('verbes_irr');
	const findResult = await collection.find().toArray();
  res.status(200).json(findResult);
})

app.post('/init',async(req,res) => {
  console.log(req);
  await client.connect();
	const db = client.db(dbName);
	const collection = db.collection('verbes_irr');
  const insertResult = await collection.insertOne(req);

  res.status(200).json(insertResult);
})

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());