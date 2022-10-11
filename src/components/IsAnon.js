import { AuthContext } from '../contexts/auth.context';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';


function IsAnon({ children }){
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if(isLoading) {
    return <p>Loading...</p>
  }

  if(isLoggedIn){
    return <Navigate to="/home" />
  } else {
    return children;
  }
}

export default IsAnon;