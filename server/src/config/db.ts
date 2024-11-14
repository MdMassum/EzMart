import mongoose from "mongoose";

const ConnectToMongo = () =>{
    
    mongoose.connect(process.env.MONGO_URL as string)
    .then((data)=>console.log(`Mongodb Connected Successfully on ${data.connection.host}`))
    .catch((err)=>console.log(err))

}

export default ConnectToMongo;