import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";

dotenv.config();

connectDB()

app.on("error", (error) => {
    console.log("app.on ERRR: ",error);
    throw error
})
app.listen(process.env.PORT || 8000, ()=> {
    console.log(`Server is running at port : ${
        process.env.PORT}`);
})
