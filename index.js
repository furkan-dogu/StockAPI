"use strict"

const express = require("express")
const app = express()
const cors = require("cors")

/* ------------------------------------------------------- */
//! Required Modules:

//? envVariables to process.env:
require("dotenv").config()
const HOST = process.env.HOST || "127.0.0.1"
const PORT = process.env.PORT || 8000

//? asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
//! Configrations:

//? Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
//! Middlewares:

//? Accept JSON:
app.use(express.json())

// ? Cors:
app.use(cors())

//? Check Authentication:
app.use(require('./src/middlewares/authentication'))

//? res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

/* ------------------------------------------------------- */
//! Routes:

//? HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Stock Management API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})

//? Routes:
app.use(require('./src/routes'))

/* ------------------------------------------------------- */

//? errorHandler:
app.use(require('./src/middlewares/errorHandler'))

//? RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))

/* ------------------------------------------------------- */
//? Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.