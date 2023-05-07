const express = require("express");
const router = express.Router();

const productController = require("../controller/product");

// GET for front page
router.get("/product",  productController.getProduct);

router.post("/product",  productController.postProduct);

router.get("/product/:id",  productController.getProductWithId);

// router.get("/search/:search",  productController.searchProduct);

router.post("/product/:id",  productController.updateProduct);

router.delete("/product/:id",  productController.deleteProduct);

//route with no check 



module.exports = router;