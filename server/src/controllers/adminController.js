import * as Services from "../services/adminService"

export const getAllCategories = (req,res) => {
    try {
        const response = Services.getAllCategories()
        return res.status(200).json(response)
    }
    catch (err){
        return res.status(500).json({error:-1, mes:"error"})
    }
}