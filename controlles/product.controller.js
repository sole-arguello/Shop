import { Products } from "../models/productModel.js";

class APIfeature{

    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
        const queryObj = {...this.queryString};
        //console.log({before: queryObj})
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach((el) => delete(queryObj[el]));
        //console.log({after: queryObj})
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|regex)\b/g, match => '$' + match);
        //console.log(queryStr)
        this.query.find(JSON.parse(queryStr));
        //console.log(queryStr)
        return this
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ');
            //console.log(sortBy)
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('createdAt');
        }
        return this
    }
    paginating(){
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 3;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this
    }
}

export class ProductController {

    static createProduct = async (req, res) => {
      try {
        const { product_id, title, price, description, content, images, category } = req.body;

        if(!images) return res.status(400).json({ message: 'No images uploaded.' });

        const product = await Products.findOne({ product_id });
        if(product) return res.status(400).json({ message: 'This product already exists.' });

        const newProduct = new Products(
            { product_id, title:title.toLowerCase(), price, description, content, images, category }
        );
        await newProduct.save();
        return res.status(200).json({message: "Product created successfully."});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

    static getProducts = async (req, res) => {
        try {
          const features = new APIfeature(Products.find(), req.query).filtering().sorting().paginating();
          const products = await features.query;
          return res.status(200).json({ message: "Products fetched successfully. ", 
          result: products.length, products });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }

    static deleteProduct = async (req, res) => {
      try {
        const { id } = req.params;
        await Products.findByIdAndDelete(id);
        return res.status(200).json({ message: "Product deleted successfully." });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }

    static updateProduct = async (req, res) => {
      try {
        const {title, price, description, content, images, category} = req.body;
        if(!images) return res.status(400).json({ message: 'No images uploaded.' });
        await Products.findByIdAndUpdate(
            {_id: req.params.id}, 
            { title:title.toLowerCase(), price, description, content, images, category }
        )
        return res.status(200).json({ message: "Product updated successfully." });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }


}