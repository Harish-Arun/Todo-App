import {Link} from "react-router-dom";

function Navbar(){
    return(
        <div className="NavBar">
            <div className="title"><h1>Todo Now</h1></div>

            <div className="navOptions">
                <Link to="/" className="nav-item">Homepage</Link>
                <Link to="/todo" className="nav-item">Todo</Link>
            </div>
        </div>


    );
};

export default Navbar;