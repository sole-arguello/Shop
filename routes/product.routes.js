import { Router } from "express";
import { Products } from "../models/productModel.js";
import { ProductController } from "../controlles/product.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

//localhost:5000/api/products
router.route('/products')
    .get(ProductController.getProducts )
    .post( ProductController.createProduct )


//localhost:5000/api/products/:id
router.route('/products/:id')
    .delete(ProductController.deleteProduct )
    .put(ProductController.updateProduct )


export { router as productRouter }