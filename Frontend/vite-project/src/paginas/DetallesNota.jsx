import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeftIcon, Loader2Icon, Trash2Icon } from "lucide-react";



const DetallesNota = () =>{

    const [nota, setNota] = useState({titulo : '' , contenido : ''});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const Navegar = useNavigate();

    const {id} = useParams();

    useEffect( () => {
        const obtenerNota = async () =>{
            try {
                const res = await axios.get(`http://localhost:5000/api/${id}`);
                console.log(res.data);
                setNota(res.data);
            } catch (error) {
                console.log('Error al obtener nota', error);
                toast.error('Error al obtener nota');
                Navegar('/')
            } finally{
                setLoading(false);
            }
        }

        obtenerNota();
    }, [id, Navegar]);

    const handleGuardar = async () =>{
        if(!nota.titulo || !nota.contenido){
            toast.error('Los campos deben estar llenos');
            return;
        }

        setSaving(true);

        try {
            await axios.put(`http://localhost:5000/api/${id}`, nota);
            toast.success('Nota actualizada con éxito');
            Navegar('/');
        } catch (error) {
            console.log('Error al actualizar Nota', error);
            toast.error('Error al actualizar nota');

        } finally{
            setSaving(false);
        }
    }
    
    const handleDelete = async () =>{
        if(!window.confirm('Seguro que quieres eliminar esta nota?')) return

        try{
            await axios.delete(`http://localhost:5000/api/${id}`);
            toast.success('Nota eliminada con éxito');
            Navegar('/');
        } catch(error){
            console.log('Error al eliminar nota', error);
            toast.error('Error al eliminar nota');
        }
    }
    
    if (loading){
        return(
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <Loader2Icon className="animate animate-spin size-10"/>
            </div>
        )
    }


    return (
       <div className="min-h-screen bg-base-200 flex items-center justify-center p-2">
            <div className="card w-90 bg-base-100 shadow-sm">
                <div className="card-body">

                    <div className="flex justify-between items-center">
                        <Link to={'/'} className="btn btn-ghost mb-2">
                            <ArrowLeftIcon className="size-5" />
                            Volver a notas
                        </Link>
                        <button className="btn btn-ghost btn-error btn-xs" onClick={handleDelete}><Trash2Icon className="size-5"/></button>
                    </div>

                    <div className="flex flex-col justify-center">
                        <form className="my-3">
                            <label className="label mb-2">
                                <span className="label-text">Titulo</span>
                            </label>
                            <input type="text"
                            placeholder="Titulo de la Nota"
                            value={nota.titulo}
                            className="input input-bordered focus:outline-none focus:border-2 text-xs mb-5"
                            onChange={(e) => setNota({...nota, titulo: e.target.value})}
                            />
                        </form>

                        <label className="label mb-2">
                                <span className="label-text">Contenido</span>
                        </label>
                        <textarea placeholder="Escribe tu contenido aqui..."
                            className="textarea textarea-bordered focus:outline-none focus:border-2 text-xs h-32"
                            value={nota.contenido}
                            onChange={(e) => setNota({...nota, contenido: e.target.value})} 
                        />

                        <div className="card-actions justify-end my-3">
                            <button type="submit" className="btn btn-primary" disabled={saving} onClick={handleGuardar}>
                                {saving ? 'Actualizando Nota...' : 'Actualizar Nota'}
                            </button>
                        </div>
                    </div>



                </div>

            </div>

       </div>
    )
}

export default DetallesNota;