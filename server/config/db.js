import mongoose from "mongoose";

const ConnectToMongo = () =>{
    console.log(process.env.MONGO_URL)
    mongoose.connect(process.env.MONGO_URL)
    .then((data)=>console.log(`Mongodb Connected Successfully on ${data.connection.host}`))
    .catch((err)=>console.log(err))

}

export default ConnectToMongo;