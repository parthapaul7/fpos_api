const ProductDetails = require('../models/productDetails');
const Fpo = require('../models/fpos');

exports.getProduct = async(req, res, next) => {
    try {
        const products = await ProductDetails.find({...req.query});
        return res.status(200).json({
            status: "success",
            data: products
        });
        
    } catch (error) {
       return res.status(500).json({
              status: "error",
              message: "some error occurred",
              error: error
    });

    }

}

exports.postProduct = async(req, res, next) => {

    if(!req.body.fpo_id) {
        return res.status(500).json({
            status: "error",
            message: "fpo_id is required",
    });

    }
    try {
        const current_quantity = req.body.quantity_added;
        const product = await ProductDetails.create({...req.body,current_quantity});

        const product_id = product._id;
        const shopUpdate = await Fpo.updateOne({_id : req.body.fpo_id},{
            $push: {products : product_id}
        })

        if(!shopUpdate.acknowledged) {
            return res.status(500).json({
                status: "error",
                message: "some error occurred",
        });
        }

        return res.status(200).json({
            status: "success",
            data: product
        });
        
    } catch (error) {
         return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
        
    }
}

exports.updateProduct = async(req, res, next) => {
    let { category_ } = req.body;
    category_ = category_.tolowercase();

    let { shop_id } = req.body;

    if(shop_id) {
        return res.status(500).json({
            status: "error",
            message: "shop_id cannot be updated",
    }); 
    }

    try {
        const product = await productDetails.updateOne({ _id: req.params.id},{...req.body,category_ });

        return res.status(200).json({
            status: "success",
            data: product
        });
        
    } catch (error) {
         return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
        
    }
}


exports.deleteProduct = async(req, res, next) => {
    try {
        const product = await productDetails.deleteOne({ _id: req.params.id});
        
        const shopUpdate = await Shop.updateOne({_id : req.body.shop_id},{
            $pull: {products : req.params.id}
        })

        if( !shopUpdate.acknowledged) {
            return res.status(500).json({
                status: "error",
                message: "some error occurred",
        });
     }
        return res.status(200).json({
            status: "success",
            data: product
        });
    } catch (error) {
            return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
    }
}


exports.getProductWithId = async(req, res, next) => {
    try {
        const product = await ProductDetails.findById(req.params.id).populate('fpo_id');
        return res.status(200).json({
            status: "success",
            data: product
        });
    } catch (error) {
       const err = new Error("No product found");
         err.statusCode = 500;
            next(err);
        return res.status(500).json({
            status: "error",
            message: "No product found",
            error: error
        });
    } 
}

    
exports.searchCategory = async(req, res, next) => {
    try {
        const products = await ProductDetails.find({ category_: req.params.category.toLowerCase() });
        return res.status(200).json({
            status: "success",
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
    }
}

