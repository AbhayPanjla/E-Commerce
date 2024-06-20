import express from "express";
import { IsAdmin, requireSignIn } from "../middleWare/authMiddleware.js";
import { createProductController, deleteProductController, filterProductController, getAllProductsController, getProductPhotoController, getSingleProductsController, updateProductController } from "../Controlers/createProductController.js";
import formidable from "express-formidable";

const router = express.Router();

// Creating products
router.post("/create-product", requireSignIn, IsAdmin, formidable(), createProductController);

// Creating products
router.put("/update-product/:pid", requireSignIn, IsAdmin, formidable(), updateProductController);

// Get all products
router.get("/get-products", getAllProductsController);

// Get singlle products
router.get("/get-product/:slug", getSingleProductsController);

// Get photo of the product
router.get("/get-picture/:pid", getProductPhotoController);

// Delete the product
router.delete("/delete-product/:pid", deleteProductController);

// filter products
router.post("/filter-product", filterProductController)

export default router;