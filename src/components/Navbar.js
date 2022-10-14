import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';

function Navbar(){
    const { isLoggedIn , logOutUser} = useContext(AuthContext);



    return(
        <nav>
                <div id='loggedout-nav'>
                    <Link className='nav-link' to="/">Home</Link>
                    <Link className='nav-link' to="/signup">Sign Up</Link>
                    <Link className='nav-link' to="/login">Log in</Link> 
                </div>
            {!isLoggedIn && (
                <></>
            )}
           
           {isLoggedIn && (
                <div id='loggedin-nav'>
                    <Link className='nav-link' to="/home">Home</Link>
                    <Link className='nav-link' to="/add-recipe">Create Recipe</Link>
                    <Link className='nav-link' to="/add-event">Create Event</Link>
                    <Link className='nav-link' to="/profile">Profile</Link>
                    <button onClick={logOutUser} >Logout</button>
                </div>
           )}

        </nav>
    )
}

export default Navbar;