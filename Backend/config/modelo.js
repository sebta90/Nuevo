import mongoose from "mongoose";

const CrearEsquema = new mongoose.Schema(
    {
        titulo : {type : String, required: true},
        contenido: {type : String, required: true},
    },
    {timestamps : true}
);

const Modelo = mongoose.model('Notas', CrearEsquema);

export default Modelo;