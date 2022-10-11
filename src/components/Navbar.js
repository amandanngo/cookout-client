import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';

function Navbar(){
    const { isLoggedIn, user , logOutUser} = useContext(AuthContext);



    return(
        <nav>

            {! isLoggedIn && (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Log in</Link> 
                </>
                
            )}
           
           {isLoggedIn && (
                <>
                    <Link to="/home">Home</Link>
                    <Link to="/add-event">Add Event</Link>
                    <Link to="/add-recipe">Add Recipe</Link>
                    <Link to="/profile">Profile</Link>
                </>

           )}


            


        </nav>
    )
}

export default Navbar;