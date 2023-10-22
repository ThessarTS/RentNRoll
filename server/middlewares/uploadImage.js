const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a combined middleware function
const uploadMulti = (fields) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10, // Adjust the file size limit as needed
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only images are allowed."));
      }
    },
  }).fields([
    { name: "ktp", maxCount: 1 },
    { name: "simA", maxCount: 1 },
    { name: "simC", maxCount: 1 },
    { name: "profilePicture", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]);

  return async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error("Error uploading images:", err);
        return res.status(500).json({ error: "Failed to upload images" });
      }

      const cloudinaryResponses = [];
      const promises = [];

      for (const field of fields) {
        if (req.files[field]) {
          const image = req.files[field][0];

          promises.push(uploadToCloudinary(image.buffer, image.originalname));
        }
      }

      try {
        const cloudinaryResults = await Promise.all(promises);

        cloudinaryResults.forEach((result, index) => {
          const field = fields[index];
          req[field] = result.secure_url;
          cloudinaryResponses.push({
            field,
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        });
        console.log(cloudinaryResponses);
        req.cloudinaryResponses = cloudinaryResponses;

        next();
      } catch (error) {
        return res.status(500).json({ error: "Failed to upload images to Cloudinary" });
      }
    });
  };
};

// Function to upload to Cloudinary
const uploadToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          public_id: originalname,
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      )
      .end(buffer);
  });
};

module.exports = uploadMulti;
