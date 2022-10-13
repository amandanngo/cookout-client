import { useState, useEffect, createContext } from 'react';

import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }){
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ user, setUser ] = useState(null);

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = () => {

    const storedToken = localStorage.getItem('authToken');

    if(storedToken){

      axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, {
        headers: {
          authorization: `Bearer ${storedToken}`
        }
      })
        .then(res => {
          console.log(res);
          const user = res.data;

          setIsLoading(false);
          setIsLoggedIn(true);
          setUser(user);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          setIsLoggedIn(false);
          setUser(null);
        })

    } else {
      setIsLoading(false);
      setIsLoggedIn(false);
      setUser(null);
    }

  }

  const removeAuthToken = () => {
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    removeAuthToken();
    authenticateUser();
  }

  useEffect(() => {
    authenticateUser();
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  );

}

export {
  AuthContext,
  AuthProvider
}