import { email } from '../helpers/joi_schema'
import db from '../models'


export const getOne = (id) => new Promise(async (resolve, reject) => {
    try {
        // console.log(id)
        const response = await db.User.findOne({
            where: { id: id },
            attributes:  ['email','phone','fullname','avt','birth']
        })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'User not found',
            userData: response
        })
    } catch (error) {
        reject(error)
    }
})

export const getAll = () => new Promise(async (resolve, reject) => {
    try {
        // console.log(id)
        const response = await db.User.findAll()
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'User not found',
            userData: response
        })
    } catch (error) {
        reject(error)
    }
})



export const updateItem = async(id,updatedData) => {
    try {
      await db.User.update(updatedData, {where: {id: id}});
  
      return {
        err: 0,
        mes: 'User updated successfully',
      };
    } catch (error) {
      return {
        err: 1,
        mes: 'Failed to update product',
        error: error.message
      };
    }
    
  }
