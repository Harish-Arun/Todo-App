import todosImg from '../asserts/todo1.png'
import {Link} from "react-router-dom";
function Homepage(){

    return(
        <div className="screen">
            <div className="home-contents">
                <p className='home-items'>Your No 1 Solution for maintaining Todo list</p>
                <h2 className='home-items'>Todo Now</h2>
                <p className='home-items'>Simplest and easist to operate</p>
                {/* <button className='login-button' onClick={handleClick}>
                    Get Started
                </button> */}
                <Link className="home-items login" to="/auth">Get Started</Link>
                <img className='home-items' src={todosImg} alt="logo" style={{opacity: 0.7}}/>
            </div>
        </div>
    )
};

export default Homepage;