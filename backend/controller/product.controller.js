import Product from "../models/product.js";
import mongoose from "mongoose";

// Function to get all products
export const getProducts = async (req,res)=> {
    try{
        const products = await Product.find({});
        res.status(200).json({success:true, data: products});
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const createProduct = async (req,res)=> {
    const product = req.body; //user will send the data in the body

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please add a product"});
    }

    const newProduct = new Product({
        name: product.name,
        price: product.price,
        image: product.image
    });

    try{
        await newProduct.save();
        res.status(201).json({success:true, data: newProduct});
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const updateProduct = async (req,res)=> {
    const {id} = req.params;
    const product = req.body;

    // if(!product.name || !product.price || !product.image){
    //     return res.status(400).json({success:false, message: "Please add a product"});
    // }
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Product not found"});
    }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success:true, data: updatedProduct});
    } catch (error) {
        //console.error("Error updating product:", error);
        res.status(500).json({success:false, message: "Server error"});
    }
}

export const deleteProduct = async (req,res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Product not found"});
    }

    try{
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, data: product});
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({success:false, message: "Server error"});
    }
}