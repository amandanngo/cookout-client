import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth.context';



function AddEventPage(){

    const { user } = useContext(AuthContext);

    const navigate = useNavigate()

    const [state, setState] = useState({
      title: '',
      date: '',
      host: user._id,
      attendeeLimit: null,
      location: ''
    });
  
    const updateState = event => setState({
      ...state,
      [event.target.name]: event.target.value
    });
  
    const handleSubmit = event => {
      event.preventDefault();
      const storedToken = localStorage.getItem('authToken');
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/events`, state, {
        headers: {
          authorization: `Bearer ${storedToken}`
        }
      })
        .then(res => {
          console.log(res.data);
          navigate('/home');
        })
        .catch(err => console.log(err))
    }


    return(
        <div id='create-event'>
            <div className="nav-banner"></div>
            <h2>Create a new Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Event Title
                    </label>
                    <input
                        name="title"
                        value={state.name}
                        onChange={updateState}
                    />
                    </div>
                <div>
                    <label>
                        Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={state.date}
                        onChange={updateState}
                    />
                </div>
                <div>
                    <label>
                        Attendee Limit
                    </label>
                    <input
                        name="attendeeLimit"
                        value={state.attendeeLimit}
                        onChange={updateState}
                    />
                </div>
                <div>
                    <label>
                        Location
                    </label>
                    <input
                        name="location"
                        value={state.location}
                        onChange={updateState}
                    />
                </div>
                <div>
                    <button>
                        Post Event
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddEventPage;