import app from './app'
import dotenv from 'dotenv';
import ConnectToMongo from './config/db'

// handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to uncaught exception")

    server.close(()=>{
        process.exit(1);
    })
})

dotenv.config()
const PORT = process.env.PORT;

ConnectToMongo();


const server = app.listen(PORT,()=>{
    console.log("Server Running on Port : ", PORT);
})

// handling unhandled promise rejection
process.on("unhandledRejection",(err:any)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to unhandled Promise Rejection")

    server.close(()=>{
        process.exit(1);
    })
})