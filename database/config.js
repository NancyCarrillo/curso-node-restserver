const mongoose = require('mongoose');

const dbconnection= async()=>{
try {
    
    await mongoose.connect( process.env.URL_MONGO,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: false 
    } )
    console.log('Base de datos online');
} catch (error) {
    console.log(error);
    throw new error('Error a la hora de iniciar la base de datos');
}


}


module.exports={
dbconnection

}