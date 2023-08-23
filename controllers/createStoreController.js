import storeModel from "../models/storeModel.js";
import userModel from "../models/userModel.js";

export const createStore = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.vendor_id });

    if (user) {
      if (!req.body.latitude || !req.body.longitude) {
        res
          .status(400)
          .json({ success: false, message: "Lat and Long is Required" });
      } else {
        const vendor = await storeModel.findOne({
          vendor_id: req.body.vendor_id,
        });

        if (vendor) {
          res
            .status(400)
            .json({ success: false, message: "Vendor already created store" });
        } else {
          const newVendor = new storeModel({
            ...req.body,
            logo: req.file.filename,
            location: {
              type: "Point",
              coordinates: [req.body.longitude, req.body.latitude],
            },
          });
          const data = await newVendor.save();
          console.log(data);
          res.status(201).json({ success: true, data: data });
        }
      }
    } else {
      res.status(400).send({ success: false, message: "Vendor ID not exist" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
