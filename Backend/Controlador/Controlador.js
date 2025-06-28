import Modelo from "../config/modelo.js";


export async function GetAll(req, res) {
    try {
        const notas = await Modelo.find();
        res.status(200).json(notas);

    } catch (error) {
        console.error('Error en la base de datos', error);
        res.status(500).json({ message: 'Error en la base de datos' });
    }
}

export async function GetByID(req, res) {
    try {
        const {id} = req.params;
        const notaByID = await Modelo.findById(id);
        if (!notaByID) {
            return res.status(404).json({ message: 'Nota no encontrada' });
        }
        else{
            res.status(200).json(notaByID);
        }

    } catch (error) {
        console.error('Error al buscar nota', error);
        res.status(500).json({ message: 'Error en la base de datos' });
    }
    
}

export async function postNota(req, res) {
    try {
        const { titulo, contenido } = req.body;
        const nota = new Modelo({ titulo, contenido });
        const notaGuardada = await nota.save();
        res.status(201).json(notaGuardada);

    } catch (error) {
        console.error('Error al crear nota', error);
        res.status(500).json({ message: 'Error al crear nota' });
    }
}

export async function updateNota(req, res) {
    try {
        const {titulo, contenido} = req.body;
        const {id} = req.params;
        const notaUpdate = await Modelo.findByIdAndUpdate(id, {titulo, contenido}, {new: true});

        if(!notaUpdate){
            res.status(404).json({message : 'Nota no encontrada'});
        }
        else{
            res.status(200).json(notaUpdate);
        }
    } catch (error) {
        console.error('Error al actualizar nota', error);
        res.status(500).json({ message: 'Error al actualizar nota' });
    }    
}

export async function deleteNota(req, res) {
    try {
        const {id} = req.params;
        const notaDelete = await Modelo.findByIdAndDelete(id);

        if(!notaDelete){
            res.status(404).json({message : 'Nota no encontrada'});
        }
        else{
            res.status(200).json({message : 'Nota eliminada con exito'});
        }
    } catch (error) {
        console.error('Error interno del servidor', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }


} 