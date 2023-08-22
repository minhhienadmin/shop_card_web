import { interalServerError, badRequest } from "../middlewares/handle_errors";
import * as Services from "../services/authService";
import { email, password,phone, refreshToken,name, birth } from "../helpers/joi_schema"
import joi from 'joi'

export const register = async (req, res) => {
    try {``
        const filedata=req.file?.path
        const data={...req.body, avt:filedata}
        console.log(data)
        const response = await Services.register(data)
        return res.status(200).json(response)
        
    } catch (error) {
        // console.log("ssssssssssssssssssssss")

        return interalServerError(res)
    }
}

export const changeinfo = async (req, res) => {
    try {
        const filedata=req.file?.path
        const data=filedata? {...req.body, avt:filedata}: req.body
        const response = await Services.changeinfo(data)
        return res.status(200).json(response)
        
    } catch (error) {
        // console.log("ssssssssssssssssssssss")

        return interalServerError(res)
    }
}

export const login = async (req, res) => {
    try {
        const { error } = joi.object({email, password }).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await Services.login(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

export const refreshTokenController = async (req, res) => {
    try {
        const { error } = joi.object({ refreshToken }).validate(req.body)
        if (error) return badRequest(error.details[0]?.message, res)
        const response = await Services.refreshToken(req.body.refreshToken)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}


export const login_success = async(req,res) => {
    const {userId} = req?.body
}