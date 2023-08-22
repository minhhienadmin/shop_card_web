import * as Services from "../services/cartService"
import { interalServerError, badRequest } from "../middlewares/handle_errors"
// import { email, password } from "../helpers/joi_schema"
// import joi from 'joi'

export const getAll = async (req, res) => {
    try {

        const userId  = req.query.userId
        // console.log(req.query)
        const response = await Services.getAll(userId)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

export const createCart = async (req,res) => {
    try {
        console.log(req.query.userId,req.body.userId)
        if (req.body.userId!==req.query.userId) return notAuth(res);
        let response = await Services.createCart(req.body)

        if (response===true) 
        return res.status(200).json({
            err: 0,
            mes: "Created"
        })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: error.message
        })
    }
}

export const deleteCart = async (req,res) => {
    try {
        // console.log(req.query.userId,req.body.userId)
        // if (req.body.userId!==req.query.userId) return notAuth(res);
        let response = await Services.deleteCart(req.query?.cartId)

        if (response===true) 
        return res.status(200).json({
            err: 0,
            mes: "Deleted !"
        })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: error.message
        })
    }
}
  




export const addItem=async(req,res)=>{
    try {
        let response = await Services.addItem(req.query?.cartId,req.body)
        res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }

}
export const getItem=async(req,res)=>{
    try {
        let response = await Services.getItem(req.query?.cartItemId)
        res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }

}
export const deleteItem=async(req,res)=>{
    try {
        let response = await Services.deleteItem(req.query?.cartItemId)
        res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }

}

export const updateItem=async(req,res)=>{
    try {
        let response = await Services.updateItem(req.query?.cartItemId,req.body)
        res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}
