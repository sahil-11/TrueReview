const Shop = require('../models/shopModel');
const ErrorResponse = require('../utils/errorResponse');

exports.adduid = async (req, res , next) => {
    try{
        
        const id = req.shop._id ;
        const shop = await Shop.findById(id);

        const transactiondId = req.body.transaction_id ;
        
        shop.uid.push(transactiondId);
        shop.save();
        console.log(shop.uid) ;

        res.status(201).json({
            success: true,
            data: shop
            
        })
       

    } catch (error) {
        next(error);
    }
}






