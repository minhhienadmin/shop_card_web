import * as Services from "../services/userService"
import { interalServerError, badRequest } from "../middlewares/handle_errors"
// import { email, password } from "../helpers/joi_schema"
// import joi from 'joi'

export const getCurrent = async (req, res) => {
    try {
        // console.log(req.query);
        const response = await Services.getOne(req.query.userId)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

export const getAll = async (req, res) => {
    try {
        // console.log(req.query);
        const response = await Services.getAll()
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

export const updateItem=async(req,res)=>{
    try {
        let response = await Services.updateItem(req.query?.userId,req.body)
        res.status(200).json(response)
    } catch (error) {
        return interalServerError(res)
    }
}
