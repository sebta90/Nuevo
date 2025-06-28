import mongoose from "mongoose";

export const conectarDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexion exitosa');
    }catch(err){
        console.log('Error al conectar a la base de datos', err);
        process.exit(1);
    }
}