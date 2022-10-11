import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import axios from 'axios'

function EventsFeed(){
    const { user } = useContext(AuthContext);

    const [events, setEvents] = useState([])

    useEffect(()=>{
        const storedToken = localStorage.getItem('authToken');

        axios.get('http://localhost:3001/api/events-feed',{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                // console.log("res",res)

                setEvents(res.data.events);
                // console.log(events)
            })
            .catch(err => console.log(err))
    },[])

    const claimSeat = (eventId, attendeeNum) => {
        console.log("event: ", eventId)
        console.log("attendees: ", attendeeNum)

        const storedToken = localStorage.getItem('authToken');


        axios.put(`http://localhost:3001/api/events/${eventId}`,{
            attendeeNum: attendeeNum+1,
            $push: {attendees: user._id}
        },{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
                // setEvents(events);
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <h2>Events</h2>

            {events.map((event) => {

                let seatsLeft = event.attendeeLimit - event.attendeeNum;

                return(
                    <div key={event._id}>
                        <p>{event.title}</p>
                        <p>Host: {event.host.username}</p>
                        <p>When: {event.date}</p>
                        <p>Where: {event.location}</p>
                        <p>Seats left: {seatsLeft}</p>
                        {seatsLeft > 0 && (
                            <button onClick={()=>{
                                claimSeat(event._id,event.attendeeNum)
                            }}>Claim seat at the table</button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default EventsFeed;