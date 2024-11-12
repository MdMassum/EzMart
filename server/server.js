import express from 'express'
import { configDotenv } from 'dotenv';
import ConnectToMongo from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

configDotenv()
// or dotenv.config()
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin:'https://localhost:5173/',     // frontend url
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

ConnectToMongo();

app.use('/',(req, res)=>{
    res.send("server running");
})
app.listen(PORT,()=>{
    console.log("Server Running on Port : ", PORT);
})