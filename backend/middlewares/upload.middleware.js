import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../libs/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "products",
        allowed_formats: ["png", "jpg", "jpeg"], // Chỉ cho phép PNG & JPG
        public_id: (req, file) => file.originalname.split(".")[0],
    },
});

// Filter để chỉ nhận file PNG & JPG
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ cho phép file PNG, JPEG, JPG!"), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
