import express from 'express'
import cors from "cors";


const app = express()

app.use(cors())

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public")) //add assets in public folder of local storage (ex.images,etc.)

//routes import`    

import courseRouter from './routes/courses.route.js'
import userRouter from './routes/user.route.js'

//routes declaration

app.get("/", (req, res) => {
    res.send('check')
})

app.use("/api/v1/courses", courseRouter)
app.use("/api/v1/user", userRouter)

export { app }