const fs = require('fs');
const path = require('path');

//import Cart
const Cart = require('./cart');

const p = path.join(path.join(__dirname, '..', 'data', 'product.json'));

const getProductsFromFile = cb => {
      fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        } else{
            cb(JSON.parse(fileContent));
        } 
      });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title; 
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  };

save() {
    getProductsFromFile(products => {
      if (this.id){
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this; 
        fs.writeFile(p,JSON.stringify(updatedProducts), err => {
          console.log(err);
        }); 
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p,JSON.stringify(products), err => {
          console.log(err);
        }); 
      }
    });
  };

  static fetchAll(cb) {
    getProductsFromFile(cb); 
  };

  static deleteById(id, cb){
    getProductsFromFile(products => {
      let data = JSON.parse(fs.readFileSync(p));
      const product = products.find(p => p.id === id);
      cb(product);
      
      // removed object from array by object's element
      let filteredData = data.filter(function(el) { return el.id != product.id; });
      
      let removedNull = filteredData.filter(item => item != null);
      
      fs.writeFile(p,JSON.stringify(removedNull), err => {
        if (!err){
          Cart.deleteProduct(id, product.price) 
        }
      }); 
    });
  };
  
  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
      console.log(product);
    });
  };
};