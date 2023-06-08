import express from 'express';
const router = express.Router();
import Product from '../models/product.js';
import Category from '../models/category.js';


router.get('/dashboard', async(req,res) => {
    Category.findAll()
    .then(categories => {
        res.render('index', {
            pageTitle: 'Welcome to Admin',
            categories:categories
        })
    })
    .catch(error => {
        res.render('index', {
            pageTitle: 'Welcome to Admin'
        })
    })
})

router.get('/products/:id', async(req, res) => {

    const id = req.params.id;
    console.log('ID: ' + id);
    Category.findByPk(id)
    .then(categoryi => {

        console.log('CATEGORY: ' + JSON.stringify(categoryi));

        Product.findAll({where: {categoryID: id}})
        .then(products => {

            

            res.render('products', {
                pageTitle: 'Edit ' + categoryi.categoryName,
                category: categoryi,
                Products: products
            })
        })
    })
    .catch(error => {
        console.log(error.message);
    })
});

router.get('/product/:id', async(req, res) => {
    const id = req.params.id;
    let product = await Product.findByPk(id)
    let categories = await Category.findAll()

    res.render('product', {
        pageTitle: 'Edit ' + product.productName,
        product: product,
        categories: categories
    })
});








export default router;