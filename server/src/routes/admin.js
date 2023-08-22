



// localhost:3001/

import * as Controllers from '../controllers/adminController'
import express from 'express'

const router = express.Router()

router.get('/category', Controllers.getAllCategories)

module.exports=router