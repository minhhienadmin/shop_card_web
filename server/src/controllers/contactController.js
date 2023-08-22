import * as Services from "../services/contactService"
import { interalServerError, badRequest } from "../middlewares/handle_errors"
// import { email, password } from "../helpers/joi_schema"
// import joi from 'joi'

export const getAll = async (req, res) => {
    try {

        // const userId  = req.query.userId
        // console.log(req.query.userId)
        const response = await Services.getAll()
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

export const addToContact=async(req, res) => {
    try {
        // console.log("===================================",req.body)
        let response = await Services.addToContact(req.query?.userId, req.body)
        res.status(200).json(response)

    } catch(err){
        return interalServerError(res)
    }
}

export const deleteItem=async(req,res)=>{
    try {
        let response = await Services.deleteItem(req.query)
        res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }

}

export const updateItem=async(req,res)=>{
    try {
        let response = await Services.updateItem(req.query?.id,req.body)
        res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}
