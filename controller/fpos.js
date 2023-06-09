const Fpos = require('../models/fpos');

exports.getShop = async(req, res, next) => {
    const shops = await Fpos.find({...req.query});

    return res.status(200).json({
        status: "success",
        data: shops
    });
}

exports.postShop = async(req, res, next) => {
    try {
        const shop = await Fpos.create(req.body);
        return res.status(200).json({
            status: "success",
            data: shop
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

exports.getShopWithId = async(req, res, next) => {
    try {
        const shop = await Fpos.findById(req.params.id).populate('orders').populate('products');

        // console.log(shop);
        if (!shop) {
            return res.status(404).json({
                status: "error",
                message: "No shop found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: shop
        });

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
    }
}

exports.updateShop = async(req, res, next) => {
    try {
        const shop = await Fpos.updateOne({_id: req.params.id}, {...req.body});

        // console.log(shop);
        if (!shop) {
            return res.status(404).json({
                status: "error",
                message: "No shop found"
            });
        }

        return res.status(200).json({
            status: "success",
            data: shop
        });
    } catch (error) {
       return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error.message 
        });
    }
}