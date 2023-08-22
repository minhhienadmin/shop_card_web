import * as controllers from '../controllers/productController'
import express from 'express'
// import verifyToken from '../middlewares/verify_token'
// import {isAdmin} from '../middlewares/verify_roles'
import uploadCloud from '../middlewares/uploader'

const router = express.Router()

    // PUBLIC ROUTES
        router.get('/all', controllers.getAllProducts)    
        router.get('/get', controllers.getOneProduct)
        router.get('/questions', controllers.getQuestions)


    // PRIVATE ROUTES

    // router.use(verifyToken)
    // router.use(isAdmin)
        router.post('/create', uploadCloud.single('image'), controllers.createNewProduct)
        router.put('/update', uploadCloud.single('image'), controllers.updateOneProduct)
        router.post('/upload-images', uploadCloud.array('images'), controllers.uploadImages);
        router.delete('/delete', controllers.deleteOneProduct)



module.exports = router