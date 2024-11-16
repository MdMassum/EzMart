import express from 'express';
import verifyAuth from '../middleware/verifyUser';
import { CreateProduct, deleteProduct, getAllProducts, getSingleProduct } from '../controllers/productController';


const router = express.Router();

router.post('/create',verifyAuth, CreateProduct)
router.get('/getAll',verifyAuth, getAllProducts)
router.post('/delete/:id',verifyAuth, deleteProduct)
router.get('/get/:id',verifyAuth, getSingleProduct)

export default router