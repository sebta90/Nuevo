import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const NavBar = () =>{
    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between items-center px-10 glass">
            <h1 className="text-primary text-3xl font-bold tracking-tight">NoteCard</h1>
            <div className="flex items-center gap-4">
            <Link to={"/crear"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>Nueva Nota</span>
            </Link>
          </div>
        </div>
    )
}

export default NavBar;