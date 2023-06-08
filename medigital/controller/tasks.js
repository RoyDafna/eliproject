import express from 'express';
const router = express.Router();
import Product from '../models/product.js';
import Category from '../models/category.js';


router.post('/add_category', async(req,res) => {
    const {categoryName,categoryMainImage} = req.body;
    Category.create({
        categoryName: categoryName,
        categoryMainImage: categoryMainImage
    })
    .then(result => {
        console.log(result);
        return res.redirect('/dashboard');
    })
    .catch(error => {
        console.log(error.message);
        return res.redirect('/dashboard');
    })
})

router.post('/add_product/:id', async(req,res) => {
    const cid = req.params.id;
    console.log(cid)
    const {productName,productMainImage,productPrice,productDescription,unitInStock} = req.body;
    Product.create({
        productName: productName,
        productMainImage: productMainImage,
        unitInStock: unitInStock,
        productPrice: productPrice,
        isAvailable: (unitInStock > 0),
        productDescription: productDescription,
        categoryID: cid
    })
    .then(result => {
        console.log(result);
        return res.redirect('/products/' + req.params.id);
    })
    .catch(error => {
        console.log('ERROR: ' + error.message);
        return res.redirect('/dashboard');
    })
})

router.post('/edit_category/:id', async(req, res) => {
    Category.findByPk(req.params.id)
    .then(product => {
        product.categoryName = req.body.categoryName;
        product.categoryMainImage = req.body.categoryMainImage;
        product.save()
        .then(product_updated => {
            res.redirect('/products/' + req.params.id);
        })
    })
    .catch(error => {
        console.log(error.message);
        return res.redirect('/dashboard');
    })
});

router.post('/edit_product/:id', async(req, res) => {
    let cid = 0
    const {categoryID, isAvailable, productName, productMainImage, productPrice, productDescription, unitInStock} = req.body;
    Product.findByPk(req.params.id)
    .then(product => {
        cid = product.categoryID;
        console.log(cid);
        product.categoryID = categoryID;
        product.isAvailable = isAvailable;
        product.productName = productName;
        product.productMainImage = productMainImage;
        product.productPrice = productPrice;
        product.productDescription = productDescription;
        product.unitInStock = unitInStock;
        product.save()
        .then(product_updated => {
            res.redirect('/products/' + cid);
        })
    })
    .catch(error => {
        console.log("ERROR- " + error.message);
        return res.redirect('/dashboard');
    })
});

router.post('/add_product/:id', async(req,res) => {
    const {productName,productMainImage,productPrice,productDescription,unitInStock} = req.body;
    Product.findByPk(req.params.id)
    .then(product => {
        product.productName= productName;
        product.productMainImage= productMainImage;
        product.unitInStock= unitInStock;
        product.productPrice= productPrice;
        product.isAvailable= (unitInStock > 0);
        product.productDescription= productDescription;
    })
    .then(result => {
        console.log(result);
        return res.redirect('/product/' + req.params.id);
    })
    .catch(error => {
        console.log('ERROR: ' + error.message);
        return res.redirect('/dashboard');
    })
})

router.get('/delete_category/:id', async(req, res) => {
    Category.findByPk(req.params.id)
    .then(product => {
        product.destroy()
        product.save()
        .then(product_updated => {
            res.redirect('/dashboard');
        })
    })
    .catch(error => {
        console.log(error.message);
        return res.redirect('/dashboard');
    })
});

router.post('/delete_product/:id', async(req, res) => {
    let categoryID = 0
    Product.findByPk(req.params.id)
    .then(product => {
        categoryID = product.categoryID
        product.destroy()
        product.save()
        .then(product_updated => {
            res.redirect('/products/' + categoryID);
        })
    })
    .catch(error => {
        console.log(error.message);
        return res.redirect('/dashboard');
    })
});


export default router;