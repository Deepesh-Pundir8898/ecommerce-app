import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import { startServer } from "./config/db/dbConnect.js";
import userRouter from "./routes/authRoute.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const PORT = process.env.PORT || 8000;

// app.use("/",(req,res)=>{
//     res.send("Hello from server side")
// })

app.use("/api/user",userRouter)

app.use(notFound);
app.use(errorHandler)


await startServer();
app.listen(PORT,()=>{console.log("Server is starting at PORT:",PORT)})