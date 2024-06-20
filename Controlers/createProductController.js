import slugify from "slugify";
import productModel from "../Modal/productModel.js";
import fs from "fs";

export const createProductController = async (req, res) => {

    try {
        const { name, slug, discription, price, quantity, category, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(404).send({ error: "Name is required" });
            case !discription:
                return res.status(404).send({ error: "discription is required" });
            case !price:
                return res.status(404).send({ error: "price is required" });
            case !quantity:
                return res.status(404).send({ error: "quantity is required" });
            case !category:
                return res.status(404).send({ error: "category is required" });
            case photo && photo.size > 1000000:
                return res.status(404).send({ error: "PHoto is required" });
        }
        const Product = new productModel({
            ...req.fields, slug: slugify(name)
        })
        if (photo) {
            Product.photo.data = fs.readFileSync(photo.path);
            Product.photo.contentType = photo.type
        }
        await Product.save()
        res.status(201).send({
            success: true,
            massage: "Product Created Successfuy",
            Product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error in the createproductsController",
            error: error
        })
    }

}

export const getAllProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(15).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalCount: products.length,
            massage: "Found all Products",
            products
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getAllProductsController",
            error: error
        })
    }
}

export const getSingleProductsController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            massage: "Found the PRoduuct",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getSingleProductsController",
            error: error
        })
    }
}

// Product picture 

export const getProductPhotoController = async (req, res) => {
    try {
        const productPictre = await productModel.findById(req.params.pid).select("photo");
        if (productPictre.photo.data) {
            res.set('Content-type', productPictre.photo.contentType)
            return res.status(200).send(productPictre.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in getProductPhotoController",
            error: error
        })
    }
}

// updateProductController
export const updateProductController = async (req, res) => {
    try {
        const { name, slug, discription, price, quantity, category, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(404).send({ error: "Name is required" });
            case !discription:
                return res.status(404).send({ error: "discription is required" });
            case !price:
                return res.status(404).send({ error: "price is required" });
            case !quantity:
                return res.status(404).send({ error: "quantity is required" });
            case !category:
                return res.status(404).send({ error: "category is required" });
            case photo && photo.size > 1000000:
                return res.status(404).send({ error: "PHoto is required" });
        }
        const Product = await productModel.findByIdAndUpdate(req.params.pid,
            {
                ...req.fields, slug: slugify(name)
            }, { new: true })
        if (photo) {
            Product.photo.data = fs.readFileSync(photo.path);
            Product.photo.contentType = photo.type
        }
        await Product.save()
        res.status(201).send({
            success: true,
            massage: "Product updated  Successfully",
            Product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "Error in the updateProductController",
            error: error
        })
    }
}

// deleteProductController

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo');
        res.status(200).send({
            success: true,
            massage: "Deleted the Produuct succesfuly",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            massage: "error in deleteProductController",
            error: error
        })
    }
}

// FIlter Controller
export const
    filterProductController = async (req, res) => {
        try {
            const { CatFilter, radio } = req.body;
            let args = {};
            if (CatFilter.length > 0) args.category = CatFilter;
            if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] };
            const products = await productModel.find(args);
            res.status(200).send({
                success: true,
                products
            })
        } catch (error) {
            console.log();
            res.status(500).send({
                success: false,
                massage: "error in filterProductController",
                error: error
            })
        }
    }