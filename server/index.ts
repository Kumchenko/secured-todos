import express from 'express'
import cors from 'cors'
import router from './src/routes'
import cookieParser from 'cookie-parser'
import ErrorMiddleware from './src/middlewares/ErrorMiddleware'
import ApiError from './src/errors/ApiError'
import { corsOptions } from './src/configs'
import { createAdmin } from './src/utils/createAdmin'

const PORT = process.env.PORT || 5000

const app = express()

// Adding middlewares
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

// Adding router
app.use('/api', router)

// Catch non-existent routes
app.use('*', (req, res, next) => {
    next(ApiError.notSupported())
})

// Error middleware must be last (For handling API Errors)
app.use(ErrorMiddleware)

// Starting of the server
try {
    app.listen(PORT, () => console.log(`Server started on ${PORT}`))

    // Create ADMIN without password if needed
    createAdmin()
        .then(() => console.log('Admin initialized'))
        .catch(() => console.log('Error occured when tried to create ADMIN'))
} catch {
    console.error(`Error occured when server tried to start`)
}
