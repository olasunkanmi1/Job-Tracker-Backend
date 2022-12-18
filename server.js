import express from 'express'
import dotenv from 'dotenv'
import  'express-async-errors'

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

//db and authenticateUser
import connectDB from './db/connect.js';

//routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';

const app = express();
dotenv.config()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome!')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`server is listening on port ${port}...`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()