import * as Services from "../services/orderService"
import { interalServerError, badRequest, notAuth } from "../middlewares/handle_errors"
// import { email, password } from "../helpers/joi_schema"
// import joi from 'joi'

export const getAll = async (req, res) => {
    try {
        const userId  = req.query?.userId
        console.log(req.query)
        const response = await Services.getAll(userId)
        return res.status(200).json(response)
        
    } catch (error) {
        return interalServerError(res)
    }
}

export const createOrder = async (req,res) => {
    try {
        console.log(req.query.userId,req.body.userId)
        if (req.body.userId!==req.query.userId) return notAuth(res);
        let response = await Services.createOrder(req.body)

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

  
export const addToOrder=async(req, res) => {
    try {
        // console.log("===================================",req.body)
        let response = await Services.addToOrder(req.query?.userId, req.body)
        res.status(200).json(response)

    } catch(error){
        return res.status(500).json({
            err:-1,
            mes: error.message
        })
    }
}

export const updateOrder=async(req, res) => {
    try {
        console.log("===================================",req.body)
        
        let response = await Services.updateOrder(req.query?.orderId,req.body)
        res.status(200).json(response)
    } catch(error){
        return res.status(500).json({
            err:-1,
            mes: error.message
        })
    }
}


export const deleteItem=async(req,res)=>{
    try {
        let response = await Services.deleteItem(req.query)
        res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes: error.message
        })
    }

}

export const updateItem=async(req,res)=>{
    try {
        let response = await Services.updateItem(req.query?.orderId,req.body)
        res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err:-1,
            mes: error.message
        })
    }
}


