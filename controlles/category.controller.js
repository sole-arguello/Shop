import { Category } from "../models/categoryModel.js";
import { Products } from "../models/productModel.js";

export class CategoryController {

    static async getCategories(req, res) {
       try {
            const categories = await Category.find();
            console.log(categories)
            res.status(200).json({ categories });
       } catch (error) {
            return res.status(500).json({ message: error.message });
       }
    }

    static createCategory = async(req, res) => {
        try {
            const { name } = req.body;

            //si existe 
            const category = await Category.findOne({ name });
            if(category) return res.status(400).json({ message: 'This Category already exists' });
            
            //sino existe la creo
            const newCategory = new Category({ name });
            console.log('categoria recibida',newCategory)
            await newCategory.save();
            return res.status(200).json({message: 'Created category sucessfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static deleteCategory = async(req, res) => {
        try {
            const { id } = req.params;
            const products = await Producs.findOne({ category: id });
            if(products) return res.status(400).json({ message: 'Please delete related products also' });
            await Category.findByIdAndDelete(id);
            return res.status(200).json({ message: 'category Deleted sucessfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static updateCategory = async(req, res) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            await Category.findOneAndUpdate({ _id: id }, { name });
            return res.status(200).json({ message: 'category Updated sucessfully' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}