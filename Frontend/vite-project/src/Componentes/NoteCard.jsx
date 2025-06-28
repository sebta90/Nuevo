import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { formatDateToDDMMYYYY } from "../Utils/FormatDate";
import { Link } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";


const NoteCard = ({nota, setNotas}) => {
    const handleDelete = async (e, id) =>{
        e.preventDefault();

        if(!window.confirm('Seguro que desea eliminar esta nota?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/${id}`);
            setNotas((prev) => prev.filter((note) => note._id !== id));
            toast.success('Nota borrada con exito');
        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("Failed to delete note");
        }
    }
    
    return (
        <Link to={`/${nota._id}`} className="card w-85 my-5 mx-5 border border-b-6 border-l-6 hover:shadow-lg transition-all duration-200
        bg-base-100 border-solid border-[#eee]">
            <div className="card w-80 bg-base-100 card-xl shadow-sm">
                <div className="card-body p-auto">
                    <div className="flex justify-between items-center my-2">
                        <h2 className="card-title">{nota.titulo}</h2>
                        <button className="btn btn-link btn-soft"><PenSquareIcon className="size-5" /></button>
                    </div>
                    <p>{nota.contenido}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-base-content/70">{formatDateToDDMMYYYY(nota.createdAt)}</span>
                        <button className="btn btn-ghost btn-error btn-xs" onClick={(e) => handleDelete(e, nota._id)}><Trash2Icon className="size-4"/></button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NoteCard;