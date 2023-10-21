const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (req, res, next) => {
    const storage = multer.memoryStorage(); // bisa diganti ke disk storage

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 10,
        },
        fileFilter: (req, file, cb) => {

            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Invalid file type. Only images are allowed.'));
            }
        }
    }).single('image');

    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to upload image' });
        }
        const { buffer, originalname } = req.file;
        const cloudinaryResponse = await cloudinary.uploader.upload_stream({
            resource_type: 'raw',
            public_id: originalname,
        }, async (error, result) => {
            if (error) {
                console.error('Error uploading to Cloudinary:', error);
                return res.status(500).json({ error: 'Failed to upload image to Cloudinary' });
            }

            const { public_id, secure_url } = result;

            req.imagePublicId = public_id;
            req.imageSecureUrl = secure_url;

            next();
        });

        cloudinaryResponse.end(buffer);
    });
};

module.exports = uploadImage