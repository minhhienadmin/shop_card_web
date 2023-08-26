import db from '../models'
import { Op } from 'sequelize'
const cloudinary = require('cloudinary').v2;


// READ
export const getAllProducts = () => new Promise(async (resolve, reject) => {
    

    try {
        // console.log("Here")
        const response = await db.Product.findAll({
            raw: true,
            nest: true,
            attributes: {
                exclude: ['createAt','updateAt']
            },
            // attributes: ['productId', 'name', 'name2', 'color', 'cut']
        })
        // console.log(response)
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'OK' : 'Getting posts is failed.',
            products: response
        })

    } catch (error) {
        reject(error)
    }
})
export const getOneProduct = (productId) => new Promise(async (resolve, reject) => {
    try {

      const response = await db.Product.findOne({
        where: { id: productId },
        raw: true,   
        nest: true,
        attributes: {
          exclude: ['createAt', 'updateAt'],
        },
        include: [{
          model: db.PriceList,
        },]
      });

      if (response) {
        response.img=response.img.split(';');
        resolve({
          err: 0,
          mes: 'got',
          product: response
        });
      } else {
        resolve({
          err: 1,
          mes: 'Product not found'
        });
      }
    } catch (error) {
      reject(error);
    }
  });
export const createNewProduct = (productData,fileData) => new Promise(async(resolve, reject) => {
    try {
          // console.log(productData)
          // console.log(db.Product.create(productData))
        const response = await db.Product.create(productData);
        resolve({
            err: 0,
            mes: 'Created',
        });

        if (fileData && !response) {
            cloudinary.uploader.destroy(fileData.avt);
        }
    } catch (error) {
        reject(error);
        if (fileData) {
            cloudinary.uploader.destroy(fileData.avt);
        }
    }
  });
export const deleteOneProduct = async (productId) => {
  try {
    const product = await db.Product.findByPk(productId);

    if (!product) {
      return {
        err: 1,
        mes: 'Product not found'
      };
    }

    await db.Product.destroy({where: { id:productId}});

    return {
      err: 0,
      mes: 'Product deleted successfully'
    };
  } catch (error) {
    return {
      err: 1,
      mes: 'Failed to delete product',
      error: error.message
    };
  }
};
export const updateOneProduct = async (productId, updatedData) => {
  try {
    console.log("updating product ", productId, updatedData)

    // console.log(db.Product.update(updatedData, {where: {productId: productId}}))
    await db.Product.update(updatedData, {where: {id: productId}});

    return {
      err: 0,
      mes: 'Product updated successfully',
    };
  } catch (error) {
    return {
      err: 1,
      mes: 'Failed to update product',
      error: error.message
    };
  }
};

export const getQuestions = async(req) => {
    try {
      const response = await db.Question.findAll({
          raw: true,
          // nest: true,
          attributes: ['question','answer','img',"id"]
      })
      // console.log(response)
      return {
        err: 0,
        mes: "got",
        questions: response
      }

  } catch (error) {
      return {
        err: 1,
        mes: error
      }
  }
}