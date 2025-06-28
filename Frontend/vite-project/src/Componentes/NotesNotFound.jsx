import { Meh} from "lucide-react";

const NotesNotFound = () =>{
    return (
        <div className="max-w-7xl mx-auto my-auto px-10 py-15">
            <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md ">
                <div className="flex flex-col md:flex-row items-center p-6">
                    <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                        <Meh className="size-10 text-primary" />
                    </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold mb-2">Notas no encontradas</h3>
                            <p className="text-base-content mb-1">
                                Cree notas nuevas
                            </p>
                            <p className="text-sm text-base-content/70">

                            </p>
                        </div>
                </div>
            </div>

        </div>
    )
}
export default NotesNotFound;