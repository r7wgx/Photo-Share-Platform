import Photo from '../model/photoModel.js';
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
 
const createPhoto = async (req, res) => {

    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath, 
      {
        use_filename: true,
        folder: "photo_share_platform"
      }
    )
 
  try {
    await Photo.create({
      name: req.body.name,
      description: req.body.description,
      user: res.locals.user._id,
      url: result.secure_url,
      image_id: result.public_id
    });

    fs.unlinkSync(req.files.image.tempFilePath); // delete file from temp after sending

    res.status(201).redirect(`/users/dashboard`);
  } catch (error) {
    res.status(500).json({
      succeded: false, 
      error
    })
  }
};

const deletePohoto = async(req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    const photoId = photo.image_id;
    
    await cloudinary.uploader.destroy(photoId);
    await Photo.findOneAndRemove({ _id: req.params.id });

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      succeded: false,
      error
    })
  }
}
const updatePhoto = async(req,res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if(req.files) {
      const photoId = photo.image_id; 
      await cloudinary.uploader.destroy(photoId);
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, 
        {
          use_filename: true,
          folder: "photo_share_platform"
        }
      )
      photo.url = result.secure_url;
      photo.image_id = result.public_id

      fs.unlinkSync(req.files.image.tempFilePath);
    }

    photo.description = req.body.description;
    photo.name = req.body.name;

    photo.save()

    res.status(200).redirect(`/photo/${req.params.id}`);
  } catch (error) {
    res.status(400).json({
      succeded: false,
      error
    })
  }
}

const getAllPhotos = async (req, res) => {
  try {
    const photos = res.locals.user
    ? await Photo.find({ user: { $ne: res.locals.user._id } })
    : await Photo.find({});
    res.status(200).render('gallery', {
      photos, 
      link: 'photo'
    });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error
    })
  }
} 

const getImage = async (req, res) => {
    try {
      const image = await Photo.findById({_id: req.params.id}).populate("user");
      res.status(200).render('image', {
        image,
        link: 'photo'
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error
      });
    }
}


export { createPhoto, getAllPhotos, getImage, deletePohoto, updatePhoto };