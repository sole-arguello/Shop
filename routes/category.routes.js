import express from 'express'
import { CategoryController } from '../controlles/category.controller.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

//localhost:5000/api/category
router.route('/category')
    .get(CategoryController.getCategories )
    .post(auth, authAdmin, CategoryController.createCategory )

//localhost:5000/api/category/:id
router.route('/category/:id')
    // .get(auth, authAdmin, CategoryController.getCategory )
    .put(auth, authAdmin, CategoryController.updateCategory )
    .delete(auth, authAdmin, CategoryController.deleteCategory )

export { router as categoryRouter }