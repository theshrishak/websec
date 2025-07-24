const Makeup = require("../models/Makeup");
const { success,failure } = require("../utils/message");
const cloudinary = require("../utils/cloudinary");

module.exports.add_makeup_service = async (req, res) => {
    try{
        // const userId = req.user._id;
        if(req.files !== undefined){
            const formImage = req.files.image;
            console.log(formImage);
            const imagePath = formImage.tempFilePath;
            if(formImage.mimetype == "image/jpeg" || formImage.mimetype == "image/jpg" || formImage.mimetype == "image/png") {
                const image = await cloudinary.upload_image(imagePath);
                const makeup = new Makeup({
                title: req.body.title,
                price: req.body.price,
                info: req.body.info,
                description: req.body.description,
                duration: req.body.duration,
                image: image
            });
                const result = await makeup.save();
                res.json(success("Makeup Service with Image Added Successfully", result));
            } else {
                res.json(failure("Must be png, jpg or jpeg"));
            }
        } else {
            const makeup = new Makeup({
                title: req.body.title,
                price: req.body.price,
                duration: req.body.duration,
                info: req.body.info,
                description: req.body.description
            });
            const result = await makeup.save();
            res.json(success("Makeup Service Added Successfully", result));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}

exports.update_makeup_service = async (req, res) => {
    try{
        const makeupId = req.params.id;
        const makeup = await Makeup.findById(makeupId);
        if(makeup){
            if(req.files !==undefined){
                const formImage = req.files.image;
                const imagePath = formImage.tempFilePath;
                if(formImage.mimetype == "image/jpeg" || formImage.mimetype == "image/jpg" || formImage.mimetype == "image/png") {
                    const image = await cloudinary.upload_image(imagePath);
                    makeup.title = req.body.title;
                    makeup.price = req.body.price;
                    makeup.duration = req.body.duration;
                    makeup.info= req.body.info;
                    makeup.description= req.body.description;
                    makeup.image = image;
                    const result = await makeup.save();
                    res.json(success("Makeup Service with Image Updated Successfully", result));
                } else {
                    res.json(failure("Must be png, jpg or jpeg"));
                }
            } else {
                makeup.title = req.body.title;
                makeup.price = req.body.price;
                makeup.duration = req.body.duration;
                makeup.info= req.body.info;
                makeup.description= req.body.description;
                const result = await makeup.save();
                res.json(success("Makeup Service Updated Successfully", result));
            }
        } else {
            res.json(failure("Makeup Service Not Found"));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}

exports.update_makeup_image = async (req, res) => {
    try{
        const makeupId = req.params.id;
        const makeup = await Makeup.findById(makeupId);
        if(makeup){
            if(req.files !==undefined){
                const formImage = req.files.image;
                const imagePath = formImage.tempFilePath;
                if(formImage.mimetype == "image/jpeg" || formImage.mimetype == "image/jpg" || formImage.mimetype == "image/png") {
                    const image = await cloudinary.upload_image(imagePath);
                    makeup.image = image;
                    const result = await makeup.save();
                    res.json(success("Makeup Image Updated Successfully", result));
                } else {
                    res.json(failure("Must be png, jpg or jpeg"));
                }
            } else {
                res.json(failure("Image Required"));
            }
        } else {
            res.json(failure("Makeup Service Not Found"));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}

exports.delete_makeup_service_by_id = async (req, res) => {
    try{
        const makeupId = req.params.id;
        await Makeup.findByIdAndDelete(makeupId);
        res.json(success("Makeup Service Deleted Successfully"));
        
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}

exports.get_all_makeup_services = async (req, res) => {
    try{
        const makeups = await Makeup.find();
        res.json(success("Makeup Services Fetched", makeups));
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}   

exports.get_makeup_service_by_id = async (req, res) => {
    try{
        const makeupId = req.params.id;
        const makeup = await Makeup.findById(makeupId);
        if(makeup){
            res.json(success("Makeup Service Fetched", makeup));
        } else {
            res.json(failure("Makeup Service Not Found"));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}   

// Controller to add a list of makeup services
exports.add_all_makeup_services = async (req, res) => {
  try {
    const makeups = req.body.makeups; // List of makeup services from the request body

    // Validate if the makeup array exists and is not empty
    if (!Array.isArray(makeups) || makeups.length === 0) {
      return res.status(400).json({ message: "Please provide a list of makeup services." });
    }

    // Insert all the makeup services into the database
    const createdMakeups = await Makeup.insertMany(makeups);

    res.status(201).json({
      message: "All Makeup services added successfully!",
      makeups: createdMakeups
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
