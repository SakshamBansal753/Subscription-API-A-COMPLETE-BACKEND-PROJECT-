import subscriptionModel from "../models/subscription.model.js";

export const createsub = async (req, res, next) => {
  try {
    const subscribe = await subscriptionModel.create({
      ...req.body,
      used: req.user._id,  // ✅ fixed from user → used
    });

    res.status(201).json({ success: true, data: subscribe });
  } catch (e) {
    next(e);
  }
};
export const getUsersub = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner");
      error.status = 401;
      throw error;
    }

    const subscribe = await subscriptionModel.find({ used: req.params.id });

    res.status(200).json({ success: true, data: subscribe });
  } catch (e) {
    next(e);
  }
};