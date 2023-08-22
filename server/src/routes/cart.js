
import * as Controllers from '../controllers/cartController'
import express from 'express'

const router = express.Router()

router.get('/get', Controllers.getAll)
router.post('/create', Controllers.createCart)
router.delete('/delete', Controllers.deleteCart)
// router.put('/update', Controllers.updateItem)

router.put('/item/update', Controllers.updateItem)
router.get('/item/get', Controllers.getItem)
router.delete('/item/delete', Controllers.deleteItem)
router.post('/item/add', Controllers.addItem)

module.exports=router