import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadFile } from '../controllers/products.controller.js';
import { Router } from "express";
import path from "path";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/products', getProducts);
router.get('/products/:id', getProduct);
router.get('/files/', getFiles);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.post('/upload', upload.single('file'), uploadFile);

export default router;