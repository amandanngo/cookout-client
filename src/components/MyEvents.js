import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function MyEvents(){

    const [events, setEvents] = useState([])

    const getEvents = () => {

        const storedToken = localStorage.getItem('authToken');

        axios.get('http://localhost:3001/api/events',{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                setEvents(res.data.events);
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        getEvents();
    },[])


    const deleteEvent = (eventId) => {
        const storedToken = localStorage.getItem('authToken');

        axios.delete(`http://localhost:3001/api/events/${eventId}`,{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                console.log(res);
                getEvents();
            })
            .catch(err => console.log(err))
    }


    return(
        <div>
            <h2>Events</h2>
            {events.map((event) => {
                return(
                    <div key={event._id}>
                        <p>{event.title}</p>
                        <p>When: {event.date}</p>
                        <p>Where: {event.location}</p>
                        <p>Attendees:</p>
                        <ul>
                            {event.attendees.map(user => {
                                return <li>{user.username}</li>
                            })}
                        </ul>
                        <button onClick={() => deleteEvent(event._id)}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MyEvents;