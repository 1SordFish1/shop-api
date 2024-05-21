const fs = require('fs');
const path = require('path');

const hello = async function (req, res) {
  res.send('Bello Minion!');
}
module.exports.hello = hello;

const getProducts = async function (req, res) {
  try {
    const filePath = path.join(__dirname, 'data/products.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    res.status(500).send('Error reading data');
  }
}
module.exports.getProducts = getProducts;

const addProduct = async function (req, res) {
  try {
    const filePath = path.join(__dirname, 'data/products.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const newObject = req.body;
    if (newObject && newObject.name && newObject.price && newObject.author) {
      const maxId = jsonData.reduce((max, obj) => (obj.id > max ? obj.id : max), 0);
      newObject.id = maxId + 1;
      jsonData.push(newObject);
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      return res.status(201).json(newObject);
    } else {
      res.status(400).send('Invalid object: Missing required properties');
    }
  } catch (error) {
    res.status(500).send('Error writing data: ' + error.message);
  }
};
module.exports.addProduct = addProduct;