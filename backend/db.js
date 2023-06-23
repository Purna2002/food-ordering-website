const mongoose = require('mongoose');

const DB = 'mongodb://localfood:purna2002@ac-btbngil-shard-00-00.kw8r4le.mongodb.net:27017,ac-btbngil-shard-00-01.kw8r4le.mongodb.net:27017,ac-btbngil-shard-00-02.kw8r4le.mongodb.net:27017/mylocalfood?ssl=true&replicaSet=atlas-cnjucc-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connection success');

  const collectionName = 'food_items'; // Replace with your collection name
  const collection = mongoose.connection.db.collection(collectionName)
  const collectionName1 = 'foodcategory';
  const collection1 = mongoose.connection.db.collection(collectionName1);
  
 try {
    const data = await collection.find({}).toArray();
    global.food_items=data;
    console.log(global.food_items);

  } catch (error) {

    console.log('Error fetching data:', error);
  }

  try {
    const catdata = await collection1.find({}).toArray();
    global.foodcategory=catdata;
    console.log(global.foodcategory);

  } catch (error) {

    console.log('Error fetching data:', error);
  }

  mongoose.connection.close();
}).catch((err) => console.log('Connection failed:', err));





 