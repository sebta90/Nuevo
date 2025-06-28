import { useEffect, useState } from "react";
import NavBar from "../Componentes/NavBar";
import RatedLimitedUi from "../Componentes/RatedLimitedUi";
import axios from "axios"
import toast from "react-hot-toast";
import NoteCard from "../Componentes/NoteCard";
import NotesNotFound from "../Componentes/NotesNotFound";



const HomePage = () =>{
    const [isRatedLimited, setIsRatedLimited] = useState(false);
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const TomarNotas = async () => {
            try {
                const respuesta = await axios.get("http://localhost:5000/api");
                console.log(respuesta.data);
                setNotas(respuesta.data);
            }
            catch(error) {
                console.log("Error a tomar notas");
                console.log(error.response)
                if(error.response.status === 429){
                    setIsRatedLimited(true);
                }
                else{
                    toast.error("Error al obtener notas");
                }
            }
            finally{
                setLoading(false);
            }
        }

        TomarNotas();
    }, []);

    return (
        <div className="min-h-screen">
            <NavBar />
            {isRatedLimited && <RatedLimitedUi />}
            
            <div className="max-w-6xl mx-auto">
                {loading && <div className="flex justify-center items-center py-10"><span className="loading loading-spinner loading-xl"></span></div>}
                


                {notas.length > 0 && !isRatedLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                        {notas.map((nota) => (
                            <NoteCard key={nota._id} nota={nota} setNotas={setNotas}></NoteCard>
                        ))}
                    </div>
                )}

                {notas.length === 0 && !isRatedLimited && !loading && <NotesNotFound/>}

            </div>



        </div>
    );
}

export default HomePage;