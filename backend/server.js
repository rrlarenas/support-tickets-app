const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} =require('./middlelware/errorMiddleware')

const connectDB = require('./config/db')


const PORT = process.env.PORT || 5000

//conexion a DB
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res) => {
    res.status(200).json({message:'Bienvenido'})
})

// /Routes
app.use('/api/users',require('./routes/usersRoutes'))

app.use(errorHandler)

app.listen(PORT,()=> console.log(`Servidor iniciado en puerto : ${PORT}`))