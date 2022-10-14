import { useEffect, useState } from 'react';
import axios from 'axios'

function MyEvents(){

    const [events, setEvents] = useState([])

    const getEvents = () => {

        const storedToken = localStorage.getItem('authToken');

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/events`,{
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

        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/events/${eventId}`,{
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
        <div id="events-feed">
            <h2>Events</h2>
            {events.map((event) => {

                let day = new Date(event.date).getDay();
                let month = new Date(event.date).getMonth();


                return(
                    <div className='profile-event' key={event._id}>
                        <h3>{event.title}</h3>
                        <p>When: {day}/{month}</p>
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