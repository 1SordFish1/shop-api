const fs = require('fs');
const path = require('path');

const hello = async function (req, res) {
  const asciiArt = `
                        :::!~!!!!!:.
                    .xUHWH!! !!?M88WHX:.
                  .X*#M@$!!  !X!M$$$$$$WWx:.
                 :!!!!!!?H! :!$!$$$$$$$$$$8X:
                !!~  ~:~!! :~!$!#$$$$$$$$$$8X:
               :!~::!H!<   ~.U$X!?R$$$$$$$$MM!
               ~!~!!!!~~ .:XW$$$U!!?$$$$$$RMM!
                 !:~~~ .:!M"T#$$$$WX??#MRRMMM!
                 ~?WuxiW*^   ^"#$$$$8!!!!??!!!
               :X- M$$$$       ^"T#$T~!8$WUXU~
              :%   ~#$$$m:        ~!~ ?$$$$$$
            :! .-   ~T$$$$8xx.  .xWW- ~""##*"
  .....   -~~:< ^ !    ~?T#$$@@W@*?$$      /^
  W$@@M!!! .!~~ !!     .:XUW$W!~ ^"~:    :
  #"~~^.x% !!  !H:   !WM$$$$Ti.: .!WUn+!^
  :::~:!!^:X~ .: ?H.!u "$$$B$$$!W:U!T$$M~
  .~~   :X@!.-~   ?@WTWo("*$$$W$TH$! ^
  Wi.~!X$?!-~    : ?$$$B$Wu("**$RM!
  $R@i.~~ !     :   ~$$$$$B$$en:^
  ?MXT@Wx.~    :     ~"##*$$$$M~
  `;
  res.send(asciiArt);
};
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

const getProductById = async function (req, res) {
  try {
    const filePath = path.join(__dirname, 'data/products.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const productId = parseInt(req.params.id, 10);
    const product = jsonData.find(obj => obj.id === productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Product not found');
    }
  } catch (error) {
    res.status(500).send('Error reading data');
  }
};
module.exports.getProductById = getProductById;

const addProduct = async function (req, res) {
  try {
    const filePath = path.join(__dirname, 'data/products.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const newObject = req.body;
    if (newObject && newObject.name && newObject.price && newObject.author && newObject.description && newObject.ratings) {
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