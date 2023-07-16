var express = require("express");
var router = express.Router();
const {MongoClient} = require('mongodb');

const ItemListDAO = require("../model/ItemListDAO");
const ItemList = require("../model/ItemList");

//Source: https://www.mongodb.com/developer/languages/javascript/node-connect-mongodb/
const uri = "mongodb+srv://cpsc455:cpsc455@cluster0.rzzldmy.mongodb.net/"
    
const client = new MongoClient(uri);

(async () => {
  console.log("Connecting to MongoDB...");
  const conn = await client.connect(function() {
    // Source: https://stackoverflow.com/questions/14495975/why-is-it-recommended-not-to-close-a-mongodb-connection-anywhere-in-node-js-code
    // Source: https://chat.openai.com/share/2fdb37d8-3bab-40b9-8157-8f2e3764b2a4
    process.on('SIGINT', function() {
      client.close()
      process.exit(0);
    })

  });
  console.log(`Database Connected`);
})()

async function initialization() {
    const client = await connectDB();
    const item1 = 
    new ItemList("1", 
    "Introduction to Machine Learning with Python: A Guide for Data Scientists Paperback – Nov. 15 2016",
    "123-432",
    "Unavailable",
    "Machine learning has become an integral part of many commercial applications and research projects, but this field is not exclusive to large companies with extensive research teams. If you use Python, even as a beginner, this book will teach you practical ways to build your own machine learning solutions. With all the data available today, machine learning applications are limited only by your imagination.", "74.82", "https://m.media-amazon.com/images/I/51d4ivN7DGL._SX379_BO1,204,203,200_.jpg");
    await ItemListDAO.createItem(client, item1)
    const item2 = new ItemList("2", 
    "Design Patterns: Elements of Reusable Object-Oriented Software Hardcover – Oct. 31 1994", 
    "123-433",
    "Unavailable",
    "These texts cover the design of object-oriented software and examine how to investigate requirements, create solutions and then translate designs into code, showing developers how to make practical use of the most significant recent developments. A summary of UML notation is included.", "60.05", "https://m.media-amazon.com/images/I/7169VZEOYFL.jpg");
    await ItemListDAO.createItem(client, item2)
    const item3 = new ItemList("3", 
    "Cryptography Algorithms: A guide to algorithms in blockchain, quantum cryptography, zero-knowledge protocols, and homomorphic encryption Paperback – March 3 2022", 
    "123-434",
    "Unavailable",
    "Cryptography Algorithms is designed to help you get up and running with modern cryptography algorithms. You'll not only explore old and modern security practices but also discover practical examples of implementing them effectively.", "59.99", "https://m.media-amazon.com/images/I/41QdgZmhneL._SX260_.jpg");
    await ItemListDAO.createItem(client, item3)
    await client.close();
}

// initialization()

/* GET items listing. */
router.get("/", async function (req, res, next) {

  const result = await ItemListDAO.getAllItems(client);

  const formatedResult = {
    "itemList": result
  }

  return res.send(formatedResult);
});

/* POST item*/
router.post("/", async function (req, res, next) {
  if (!req.body.itemName) {
    return res.status(400).send({ message: "Item must have a item name" });
  }

  if (!req.body.itemDescription) {
    return res
      .status(400)
      .send({ message: "Item must have a item description" });
  }

  if (req.body.itemPrice !== 0 && !req.body.itemPrice) {
    return res.status(400).send({ message: "Item must have a item price" });
  }


  if (!req.body.itemImageLink) {
    return res
      .status(400)
      .send({ message: "Item must have a item image link" });
  }

  const itemInput = {
    itemId: (1 + Number(await ItemListDAO.getLastestItemId(client))).toString(),
    itemName: req.body.itemName,
    itemSKU: req.body.itemSKU,
    itemManufacturer: req.body.itemManufacturer,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemImageLink: req.body.itemImageLink,
  };

  const creating = async () => {
  
    await ItemListDAO.createItem(client, new ItemList(
      (1 + Number(await ItemListDAO.getLastestItemId(client))).toString(),
      req.body.itemName,
      req.body.itemSKU,
      req.body.itemManufacturer,
      req.body.itemDescription,
      req.body.itemPrice,
      req.body.itemImageLink,
    ));
  
  }
  creating();

  return res.send(itemInput);
});

/* Delete Item */
router.delete("/:itemId", async function (req, res, next) {
  const selectedItemId = req.params.itemId;

  //Sources: https://www.freecodecamp.org/news/how-to-remove-an-element-from-a-javascript-array-removing-a-specific-item-in-js/#:~:text=You%20can%20remove%20the%20element,of%20the%20element%20to%20remove.&text=The%20splice%20method%20can%20accept%20many%20arguments.
  let deletedItem = null;
  deletedItem = [await ItemListDAO.findOneAndDeleteItem(client, selectedItemId)];


  return res.send(deletedItem);
});

/* Delete All Items */
router.delete("/", async function (req, res, next) {
  await ItemListDAO.deleteAllItem(client);
  return res.send("All Items Deleted");
});

// Patch 
/* Update the details of an item where the description and price of an Item get updated*/
router.patch("/:itemId", async function (req, res, next) {

  const selectedItemId = req.params.itemId;

  if (!req.body.itemDescription) {
    return res
      .status(400)
      .send({ message: "Item must have a item description" });
  }

  if (req.body.itemPrice !== 0 && !req.body.itemPrice) {
    return res.status(400).send({ message: "Item must have a item price" });
  }

  const itemInput = {
    itemId:  (await ItemListDAO.getLastestItemId(client)).toString(),
    itemName: req.body.itemName,
    itemSKU: req.body.itemSKU,
    itemManufacturer: req.body.itemManufacturer,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemImageLink: req.body.itemImageLink,
  };

  const result = await ItemListDAO.findOneAndUpdateItem(client, selectedItemId, itemInput);

  //Source: https://www.youtube.com/watch?v=-sUdKQjtH5U&list=PL1BztTYDF-QPdTvgsjf8HOwO4ZVl_LhxS&index=37&ab_channel=procademy
  Object.assign(result, req.body);

  return res.send(result);
});
module.exports = router;
