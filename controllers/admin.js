const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      docTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing: false
    });
  };
  
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title,
          price = req.body.price,
          description = req.body.description,
          imageUrl = req.body.imageUrl;
    const product = new Product(null ,title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode){
    return res.redirect('/');
  }
  const productId = req.params.productId;
  Product.findById(productId, product => {
    if (!product){
        return res.redirect('/');
    }
    res.render('admin/edit-product', {
      docTitle: 'Edit Product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId,
        updatedTitle = req.body.title,
        updatedImageUrl = req.body.imageUrl,
        updatedPrice = req.body.price,
        updatedDescription = req.body.description;
  
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription);
    updatedProduct.save();

    // after saved product should be redirect
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      docTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

// delete Product
exports.getDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteById(productId, product => {
    res.redirect('/');
  });
};