const Order = require('../models/orders');
const Buyer= require('../models/buyers');
const ProductDetail = require('../models/productDetails');
const Fpo = require('../models/fpos');

exports.getOrder = async(req, res, next) => {
    try {
        const orders = await Order.find();
        
        return res.status(200).json({
            status: "success",
            data: orders
        });

    } catch (error) {
        
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
    }

}

exports.postOrder = async(req, res, next) => {


        const { buyer_id } = req.body;
    try {

        // fetching and calculating quantity
        // wait till all the products are updated

        const product_details = req.body.product_details;

        for(let i=0;i<product_details.length;i++){
            const product = await ProductDetail.findById(product_details[i].product_id); 
            const current_quantity = Number(product.current_quantity) - Number(product_details[i].quantity);

            if(current_quantity < 0){
                return res.status(500).json({
                    status: "error",
                    message: "insufficient quantity",
                });
            }
            // updating details of product
            const productUpdate = await ProductDetail.updateOne({_id : product_details[i].product_id},{
                current_quantity : current_quantity.toString()
            })
    
            if(!productUpdate.acknowledged) {
                return res.status(500).json({
                    status: "error",
                    message: "some error occurred",
                });
            }
        }
        // const previous_quantity = product.current_quantity;
        
        
        // do this only if the above is successful

        // updating details
        const orders = await Order.create(req.body);

        const userUpdate = await Buyer.updateOne({_id : buyer_id},{
            $push: {orders : orders._id}
        })
        const fopUpdate = await Fpo.updateOne({_id : req.body.Fpo_id},{
            $push: {orders : orders._id}
        })

        if( !userUpdate.acknowledged || !fopUpdate.acknowledged ){
            // const productUpdate = await ProductDetail.updateOne({_id : req.body.product_id},{
            //     current_quantity : previous_quantity 
            // })
            return res.status(500).json({
                status: "error",
                message: "some error occurred",
            });
        }
        return res.status(200).json({
            status: "success",
            data: orders 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });        
    }

}

exports.updateOrder = async(req, res, next) => {
        const { user_id } = req.body;
        if(!user_id){
            return res.status(500).json({
                status: "error",
                message: "user id not provided",
            });
        } 
    try {
       const orders = await Order.updateOne({_id : req.params.id},req.body);

       return res.status(200).json({
            status: "success",
            data: orders 
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });        
    }

}

exports.deleteOrder = async(req, res, next) => {
    try {

        // fetching details and calculating current quantity 
        const order_details = await Order.findById(req.params.id);

        const product_details = order_details.product_details;
        for(let i=0;i<product_details.length;i++){
        const product = await ProductDetail.findById(product_details[i].product_id);
        

        const current_quantity = Number(product.current_quantity) + Number(product_details[i].quantity);

        console.log(current_quantity);
            if(current_quantity < 0){
                return res.status(500).json({
                    status: "error",
                    message: "some error occurred",
                });

            }
            const productUpdate = await ProductDetail.updateOne({_id : product_details[i].product_id},{
                current_quantity : current_quantity.toString()
            })

            if(!productUpdate.acknowledged) {
                return res.status(500).json({
                    status: "error",
                    message: "some error occurred",
                });
            }
        }
        // updating details 
        const orders = await Order.deleteOne({_id : req.params.id});

        const userUpdate = await Buyer.updateOne({_id : order_details.buyer_id},{
            $pull: {orders : req.params.id}
        })
        const fopUpdate = await Fpo.updateOne({_id : order_details.Fpo_id},{
            $pull: {orders : req.params.id}
        })
        
        if( !userUpdate.acknowledged || !fopUpdate.acknowledged){
            return res.status(500).json({
                status: "error",
                message: "some error occurred",
            });
        }
        return res.status(200).json({
            status: "success",
            data: orders 
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });        
    }

}



exports.getOrderWithId = async(req, res, next) => {

    try {
        const order = await Order.findById(req.params.id).populate('product_id').populate("Fpo_id");
        return res.status(200).json({
            status: "success",
            data: order
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
    } 
}