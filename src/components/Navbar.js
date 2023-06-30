import {Link} from "react-router-dom";
import { useAuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const {user,setUser}=useAuthContext();
    const navigate=useNavigate();
    setUser("email");
    const handleClick= (e)=>{
        e.preventDefault()
        console.log(user);
        if(user.length>0){
            navigate("/todo");
        }
        else{
            navigate("/auth");
        }
    }
    return(
        <div className="NavBar">
            <div className="title"><h1>Todo Now</h1></div>

            <div className="navOptions">
                <Link to="/" className="nav-item">Homepage</Link>
                <Link onClick={handleClick} to="/todo" className="nav-item">Todo</Link>
            </div>
        </div>


    );
};

export default Navbar;