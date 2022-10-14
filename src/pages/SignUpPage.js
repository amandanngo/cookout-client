
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage(){

    const navigate = useNavigate()

    const [state, setState] = useState({
        name : '',
        username: '',
        password: ''
      });
    
      const updateState = event => setState({
        ...state,
        [event.target.name]: event.target.value
      });
    
      const handleSubmit = event => {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, state)
          .then(res => {
            console.log(res.data);
            navigate('/login')
          })
          .catch(err => console.log(err))
    
      }

    return(
        <div id="sign-up">
            <div className="nav-banner"></div>
            {/* <h1>Sign Up</h1> */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name
                    </label>
                    <input
                        name="name"
                        value={state.name}
                        onChange={updateState}
                        required
                    />
                </div>
                <div>
                    <label>
                        Username
                    </label>
                    <input
                        name="username"
                        value={state.username}
                        onChange={updateState}
                        required
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
                        required
                    />
                </div>
                <div>
                    <button>
                        Create Account
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUpPage;