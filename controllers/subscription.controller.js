import Subscription from "../database/models/subscription.models.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
            
        });

        res.status(201).json({ success: true, data: subscription });
    } catch (erorr) {
        next(erorr);
    }
}


export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user._id !== req.params.id){
            const error = new Error('Unauthorized');
            error.status = 401;
            throw error;
        }

        const subscription = await Subscription.find({ user: re.params.id});
        res.status(200).json( {success: true, data: subscription})
    } catch (error) {
        next(error);
    }
};