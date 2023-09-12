
import * as Controllers from '../controllers/commentController'
import express from 'express'

const router = express.Router()

router.get('/get', Controllers.getComments)
router.post('/create', Controllers.createComment)
router.delete('/delete', Controllers.deleteComment)
// router.put('/update', Controllers.updateItem)


module.exports=router