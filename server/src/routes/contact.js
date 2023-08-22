
import * as Controllers from '../controllers/contactController'
import express from 'express'

const router = express.Router()

router.get('/get', Controllers.getAll)
router.post('/create-new', Controllers.addToContact)
router.delete('/delete', Controllers.deleteItem)
router.put('/update', Controllers.updateItem)

module.exports=router