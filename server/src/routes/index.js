import auth from './auth'
import admin from './admin'
import product from './product'
import cart from './cart'
import user from './user'
import order from './order'
import contact from './contact'
import comment from './comment'
import test from './test'


import { interalServerError, Homeroute } from '../middlewares/handle_errors'
// import verifyToken from '../middlewares/jwt'

const initRoutes = (app) =>{
    // app.use('/api/v1/user', user)
    app.use('/api/v1/auth', auth)
    app.use('/api/v1/admin', admin)
    app.use('/api/v1/product', product)
    app.use('/api/v1/cart', cart)
    app.use('/api/v1/user', user)
    app.use('/api/v1/order', order)
    app.use('/api/v1/contact', contact)
    app.use('/api/v1/comment', comment)
    app.use('/api/v1/test', test)
    // return app.use('/', )
    return app.use('/', Homeroute)
}

export default initRoutes