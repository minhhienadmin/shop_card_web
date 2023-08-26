
import * as Controllers from '../controllers/orderController'
import express from 'express'

const router = express.Router()

router.post('/create', Controllers.createOrder)
router.post('/create', Controllers.createOrder)
router.get('/all', Controllers.getAll)
// router.delete('/delete', Controllers.deleteItem)
// router.put('/update', Controllers.updateItem)

// Private for admin
// router.get('/get-all', Controllers.getAll)
router.put('/update', Controllers.updateOrder)

module.exports=router