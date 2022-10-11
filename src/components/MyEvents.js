import { useEffect, useState } from 'react';

import axios from 'axios'

function MyEvents(){

    const [events, setEvents] = useState([])

    const storedToken = localStorage.getItem('authToken');

    useEffect(()=>{

        axios.get('http://localhost:3001/api/events',{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                console.log("res",res)

                setEvents(res.data.events);
                console.log('events',events)
            })
            .catch(err => console.log(err))
    },[])


    const deleteEvent = (eventId) => {

        axios.delete(`http://localhost:3001/api/events`,{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                console.log(res);
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