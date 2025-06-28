import express from 'express';
import ruta from './rutas/rutaPrincipal.js';
import dotenv from 'dotenv';
import cors from "cors";
import { conectarDB } from './config/DB.js';
import rateLimiter from './middlewares/RateLimiter.js';

dotenv.config()

const app = express();
const port = process.env.PORT;


app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());
app.use(rateLimiter);

app.use('/api', ruta);





conectarDB();

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
