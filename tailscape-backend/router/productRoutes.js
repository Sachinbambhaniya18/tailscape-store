const express = require('express');
const { getProductById,getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controller/productController');

const router = express.Router();
router.get('/products/:id', getProductById);

router.get('/', getAllProducts);
router.post('/create-product', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;