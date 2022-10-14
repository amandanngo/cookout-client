import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/auth.context';

function LogInPage(){

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const navigate = useNavigate()
  
    const [state, setState] = useState({
      username: '',
      password: ''
    });
  
    const updateState = event => setState({
      ...state,
      [event.target.name]: event.target.value
    });
  
    const handleSubmit = event => {
      event.preventDefault();
  
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, state)
        .then(res => {
          console.log(res.data);
          storeToken(res.data.authToken);
          authenticateUser();
          navigate('/home');
        })
        .catch(err => console.log(err))
  
    }

    return(
        <div id='log-in'>
            <div className='nav-banner'></div>
            {/* <h1>Log In</h1> */}
            <form onSubmit={handleSubmit}>
                <div>
                <label>
                    Username
                </label>
                <input
                    name="username"
                    value={state.username}
                    onChange={updateState}
                />
                </div>
                <div>
                <label>
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={updateState}
                />
                </div>
                <div>
                <button>
                    Log In
                </button>
                </div>
            </form>
        </div>
    )
}

export default LogInPage;