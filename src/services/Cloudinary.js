
const sharp = require('sharp');
const cloudinary = require('cloudinary');
const Datauri = require('datauri');
const path = require('path');
const dUri = new Datauri();
require('../config/cloudinary');

module.exports = {
  async cloudinaryImage (image) {
    const buffer = await sharp( image.buffer).resize({
      width: 250, height: 300
    }).png().toBuffer()
    // return console.log(buffer)

    const dataUri = dUri.format(path.extname( image.originalname ).toString(), buffer);
    const imageFile = dataUri.content;
    // return console.log(imageFile)
    const imageUrl = await cloudinary.v2.uploader.upload(imageFile);

    return imageUrl;
  }
}