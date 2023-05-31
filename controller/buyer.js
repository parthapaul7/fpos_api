const User = require('../models/buyers');

exports.getUser = async(req, res, next) => {
    try {
        const users = await User.find({...req.query});
        
        return res.status(200).json({
            status: "success",
            data: users
        });

    } catch (error) {
        
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
    }

}

exports.postUser = async(req, res, next) => {
    try {
        const users = await User.create(req.body);
        return res.status(200).json({
            status: "success",
            data: users 
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });        
    }

}

exports.updateUser = async(req, res, next) => {
    try {
        const user = await User.updateOne({_id : req.params.id}, req.body);
        return res.status(200).json({
            status: "success",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
    }
}


exports.getUserWithId = async(req, res, next) => {

    try {
        const user = await User.findById(req.params.id).populate('orders');
        return res.status(200).json({
            status: "success",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "some error occurred",
            error: error
        });
    } 
}
