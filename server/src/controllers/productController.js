import * as Services from "../services/productService"
import { interalServerError, badRequest } from "../middlewares/handle_errors"
import { title, image, category_code, price, available, bid, bids, filename, description } from "../helpers/joi_schema"
import joi from 'joi'
import { response } from "express";
const cloudinary = require('cloudinary').v2;


export const getAllProducts = async (req, res) => {
    try {
        const response = await Services.getAllProducts()
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

export const getOneProduct = async (req, res) => {
    try {
      const productId = req.query.productId;
      const response = await Services.getOneProduct(productId);
      
      if (response.err === 0) {
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ err: 1, mes: 'Product not found' });
      }
    } catch (error) {
      return res.status(500).json({ err:-1, mes: 'Internal Server Error' });
    }
  };
  
export const createNewProduct = async (req, res) => {
    try {
      const fileData = req.file, image= fileData?.path

      // Create a new product object
      const productData = {...req.body, avt: image};

      const response = await Services.createNewProduct(productData,fileData);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const updateOneProduct = async (req, res) => {
  try {
      const data = {...req.body, avt:req.file?.path}
      const response = await Services.updateOneProduct(req.query?.productId,req.body)
      return res.status(200).json(response)

  } catch (error) {
      return interalServerError(res)
  }
}

export const deleteOneProduct = async (req, res) => {
    try {
        const response = await Services.deleteOneProduct(req.query?.productId)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

export const uploadImages=async (req,res)=>{
  try {
    
    // console.log(req)
    const images = req.files;
    let path = images.map(obj=>obj?.path)
    let img = path.join(';'); // Use ';' as the separator

    // Cắt ảnh thành mảng
    // let path2 = urlString.split(';');


    if (img && req.query?.productId)
      {
        const response= await Services.updateOneProduct(req.query?.productId,{img:img})
        return res.status(200).json(response)
      }
    return {
      err:1,
      mes:"Upload images failed"
    }
    
  } catch (error) {
    return interalServerError(res)
  }
}

export const getQuestions=async(req, res) => {
  try {
    let response= await Services.getQuestions(req.query?.productId)
    return res.status(200).json(response)
  } catch (err) {
    return interalServerError(res)   
  }
}