import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import noteRoutes from './routes/note.route.js'

const app = express()

dotenv.config()
const port = process.env.PORT || 3000

// DB connection
try {
    mongoose.connect(process.env.MONGO_URL)
        console.log("connected");
        
} catch (error) {
    console.log("error", error);
    
}

// routing middleware

app.use(express.json())
app.use(cors())
app.use("/api/v1/notesapp", noteRoutes)



app.listen(port, () => {
    console.log(`server is running at ${port}`);
    
})