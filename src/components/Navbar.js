import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';

function Navbar(){
    const { isLoggedIn, user , logOutUser} = useContext(AuthContext);



    return(
        <nav>

            {! isLoggedIn && (
                <div id='loggedout-nav'>
                    <Link className='nav-link' to="/">Home</Link>
                    <Link className='nav-link' to="/signup">Sign Up</Link>
                    <Link className='nav-link' to="/login">Log in</Link> 
                </div>
                
            )}
           
           {isLoggedIn && (
                <div id='loggedin-nav'>
                    <Link className='nav-link' to="/add-recipe">Create Recipe</Link>
                    <Link className='nav-link' to="/home">Home</Link>
                    <Link className='nav-link' to="/add-event">Create Event</Link>
                    <Link className='nav-link' to="/profile">Profile</Link>
                    <button onClick={logOutUser} >Logout</button>
                </div>
           )}


            


        </nav>
    )
}

export default Navbar;