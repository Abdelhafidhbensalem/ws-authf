const mongoose=require('mongoose')
const connectDb =async()=>{
    try{
        await mongoose.connect(process.env.MONG_URI)
         console.log("Db connect");
    }
    catch(err){
        console.log(err)
    }

}
module.exports=connectDb