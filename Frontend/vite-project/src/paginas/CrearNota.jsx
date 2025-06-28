import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CrearNota = () =>{
    const [titulo, setTitulo] = useState("");
    const [contenido, setContenido] = useState("");
    const [loading, setLoading] = useState(false);

    const navegar = useNavigate();

    const crearNota = async (e) =>{
        e.preventDefault();

        if(!titulo.trim() || !contenido.trim()){
            toast.error('Todos los campos son requeridos');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api',{titulo, contenido});
            toast.success('Nota Creada');
            navegar('/');
        } catch (error) {
            console.log('Error al crear nota');
            if(error.response.status === 429){
                toast.error('Demasiadas solicitudes, intenta de nuevo más tarde',{
                    duration: 4000,
                    icon: "💀",
                });
            }
            else{
                toast.error('Falla al crear Notas');
            }
        } finally{
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-2">
            <div className="card w-95 bg-base-100 shadow-sm">
                <div className="card-body">
                    <div className="flex justify-items-start">
                        <Link to={'/'} className="btn btn-ghost mb-2">
                            <ArrowLeftIcon className="size-5" />
                            Volver a notas
                        </Link>
                    </div>

                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl font-bold">Crear Nota Nueva</h2>
                        <form className="my-3" onSubmit={crearNota}>
                            <label className="label mb-2">
                                <span className="label-text">Titulo</span>
                            </label>
                            <input type="text" 
                            placeholder="Titulo de la Nota"
                            className="input input-bordered focus:outline-none focus:border-2 text-xs mb-5"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            />
                            <label className="label mb-2">
                                <span className="label-text">Contenido</span>
                            </label>
                            <textarea placeholder="Escribe tu contenido aqui..."
                            className="textarea textarea-bordered focus:outline-none focus:border-2 text-xs h-32"
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            />

                            <div className="card-actions justify-end my-3">
                                <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Creando Nota.." : "Crear Nota"}</button>
                            </div>
                            
                        </form>
                    </div>
                    

                    

                </div>
            </div>

        </div>
    )
}

export default CrearNota;