import Subscription from "../database/models/subscription.models.js";
import { workflowClient } from "../config/upstash.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                "content-type": "application/json",
            },
            retries: 3,
        });

        res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};


export const getUserSubscriptions = async (req, res, next) => {
    try {
        // ❗ Fix: ObjectId !== string → uvijek true, mora String comparison
        if (req.user._id.toString() !== req.params.id.toString()) {
            const error = new Error("Unauthorized");
            error.status = 401;
            throw error;
        }

        // ❗ Fix: typo re.params → req.params
        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};
