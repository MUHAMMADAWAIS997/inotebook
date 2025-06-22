const mongoose=require('mongoose')
const Mongo_URI="mongodb://localhost:27017/local"
const connectToMongo= async ()=>{
    try{
         await mongoose.connect(Mongo_URI)
         console.log('MongoDb connected')
    }catch(error){
        console.error('connection error',error)
    };
    
}
module.exports=connectToMongo;