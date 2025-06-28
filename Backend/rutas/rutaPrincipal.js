import express from 'express';
import { deleteNota, GetAll, GetByID, postNota, updateNota } from '../Controlador/Controlador.js';

const ruta = express.Router();

ruta.get('/', GetAll);
ruta.get('/:id', GetByID);
ruta.post('/', postNota);
ruta.put('/:id', updateNota);
ruta.delete('/:id', deleteNota);







export default ruta;