import * as Services from "../services/commentService"
import { interalServerError, badRequest } from "../middlewares/handle_errors"
// import { email, password } from "../helpers/joi_schema"
// import joi from 'joi'

export const getComments = async (req, res) => {
    try {

        const userId  = req.query.userId
        // console.log(req.query)
        const response = await Services.getAll(userId)
        return res.status(200).json(response)

    } catch (error) {
        return interalServerError(res)
    }
}

export const createComment = async (req,res) => {
    try {
        console.log(req.query.userId,req.body.userId)
        if (req.body.userId!==req.query.userId) return notAuth(res);
        let response = await Services.createComment(req.body)

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

export const deleteComment = async (req,res) => {
    try {
        // console.log(req.query.userId,req.body.userId)
        // if (req.body.userId!==req.query.userId) return notAuth(res);
        let response = await Services.deleteComment(req.query?.commentId)

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


