import cors from 'cors'
import express from 'express'
require('dotenv').config()
import initRoutes from './src/routes'
require('./connection_database')
import './src/passport';
import cookieParser from 'cookie-parser'
const app = express()

const allowedOrigins = [process.env.CLIENT_URL, process.env.HOST_URL, process.env.HOST_URL2, process.env.MANAGER_URL, process.env.MAIN_URL];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

// CRUD
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
initRoutes(app)

const PORT = process.env.PORT || 7749

const listener = app.listen(PORT, () => {
    console.log('Server is running on the port ' + listener.address().port);
})