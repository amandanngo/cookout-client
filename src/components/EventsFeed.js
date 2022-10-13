import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth.context';
import axios from 'axios'

function EventsFeed(){
    const { user } = useContext(AuthContext);

    const [events, setEvents] = useState([])

    useEffect(()=>{
        const storedToken = localStorage.getItem('authToken');

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/events-feed`,{
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


        axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/events/${eventId}`,{
            attendeeNum: attendeeNum+1,
            $push: {attendees: user._id}
        },{
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        })
            .then(res => {
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            {events.map((event) => {

                let seatsLeft = event.attendeeLimit - event.attendeeNum;
                let day = new Date(event.date).getDay();
                let month = new Date (event.date).getMonth();

                return(
                    <div className='event-post' key={event._id}>
                        <div>
                            <h3>{event.title}</h3>
                            <p>Host: {event.host.username}</p>
                            <p>When: {day}/{month}</p>
                            <p>Where: {event.location}</p>
                        </div>
                        <div>
                            <p>Seats left: {seatsLeft}</p>
                            {seatsLeft > 0 && (
                                <button onClick={()=>{
                                    claimSeat(event._id,event.attendeeNum)
                                }}>Claim seat at the table</button>
                            )}
                        </div>
                        
                    </div>
                )
            })}
        </div>
    )
}

export default EventsFeed;