const Nail = require("../models/Nail");
const { success,failure } = require("../utils/message");
const cloudinary = require("../utils/cloudinary");

module.exports.add_nail_service = async (req, res) => {
    try{
        // const userId = req.user._id;
        if(req.files !==undefined){
            const formImage = req.files.image;
            const imagePath = formImage.tempFilePath;
            if(formImage.mimetype == "image/jpeg" || formImage.mimetype == "image/jpg" || formImage.mimetype == "image/png") {
                const image = await cloudinary.upload_image(imagePath);
                const nail = new Nail({
                title: req.body.title,
                price: req.body.price,
                duration: req.body.duration,
                info: req.body.info,
                description: req.body.description,
                image: image
            });
                const result = await nail.save();
                res.json(success("Nail Service with Image Added Successfully", result));
            } else {
                res.json(failure("Must be png, jpg or jpeg"));
            }
        } else {
            const nail = new Nail({
                title: req.body.title,
                price: req.body.price,
                duration: req.body.duration,
                info: req.body.info,
                description: req.body.description
            });
            const result = await nail.save();
            res.json(success("Nail Service Added Successfully", result));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}


exports.update_nail_service = async (req, res) => {
    try{
        const nailId = req.params.id;
        const nail = await Nail.findById(nailId);
        if(nail){
            if(req.files !==undefined){
                const formImage = req.files.image;
                const imagePath = formImage.tempFilePath;
                if(formImage.mimetype == "image/jpeg" || formImage.mimetype == "image/jpg" || formImage.mimetype == "image/png") {
                    const image = await cloudinary.upload_image(imagePath);
                    nail.title = req.body.title;
                    nail.price = req.body.price;
                    nail.duration = req.body.duration;
                    nail.image = image;
                    nail.info= req.body.info;
                    nail.description= req.body.description;
                    const result = await nail.save();
                    res.json(success("Nail Service with Image Updated Successfully", result));
                } else {
                    res.json(failure("Must be png, jpg or jpeg"));
                }
            } else {
                nail.title = req.body.title;
                nail.price = req.body.price;
                nail.duration = req.body.duration;
                nail.info= req.body.info;
                nail.description= req.body.description;
                const result = await nail.save();
                res.json(success("Nail Service Updated Successfully", result));
            }
        } else {
            res.json(failure("Nail Service Not Found"));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}

exports.update_nail_image = async (req, res) => {
    try{
        const nailId = req.params.id;
        const nail = await Nail.findById(nailId);
        if(nail){
            if(req.files !==undefined){
                const formImage = req.files.image;
                const imagePath = formImage.tempFilePath;
                if(formImage.mimetype == "image/jpeg" || formImage.mimetype == "image/jpg" || formImage.mimetype == "image/png") {
                    const image = await cloudinary.upload_image(imagePath);
                    nail.image = image;
                    const result = await nail.save();
                    res.json(success("Nail Image Updated Successfully", result));
                } else {
                    res.json(failure("Must be png, jpg or jpeg"));
                }
            } else {
                res.json(failure("No Image Found"));
            }
        } else {
            res.json(failure("Nail Service Not Found"));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}

exports.delete_nail_service_by_id = async (req, res) => {
    try{
        const nailId = req.params.id;
        await Nail.findByIdAndDelete(nailId);
        res.json(success("Nail Service Deleted Successfully"));
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}

exports.get_all_nail_services = async (req, res) => {
    try{
        const nails = await Nail.find();
        res.json(success("Nail Services Fetched", nails));
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}   

exports.get_nail_service_by_id = async (req, res) => {
    try{
        const nailId = req.params.id;
        const nail = await Nail.findById(nailId);
        if(nail){
            res.json(success("Nail Service Fetched", nail));
        } else {
            res.json(failure("Nail Service Not Found"));
        }
    } catch(err){
        console.log(err);
        res.json(failure("Something went wrong"));
    }
    res.end();
}   


// Controller to add a list of nail services
exports.add_all_nail_services = async (req, res) => {
  try {
    const nails = req.body.nails; // List of nail services from the request body

    // Validate if the nail array exists and is not empty
    if (!Array.isArray(nails) || nails.length === 0) {
      return res.status(400).json({ message: "Please provide a list of nail services." });
    }

    // Insert all the nail services into the database
    const createdNails = await Nail.insertMany(nails);

    res.status(201).json({
      message: "All nail services added successfully!",
      nails: createdNails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};