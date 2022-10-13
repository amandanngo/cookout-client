import MyEvents from "../components/MyEvents";
import MyRecipes from "../components/MyRecipes";
import { useState} from 'react';


function ProfilePage(){

    const [view,setView] = useState('recipes')

    const viewEvents = () => {
        setView('events')
    }
    const viewRecipes = () => {
        setView('recipes')
    }
    return(
        <div>
            <div className="nav-banner"></div>
            <h1>Profile</h1>
            <button onClick={viewEvents}>Events</button>
            <button onClick={viewRecipes}>Recipes</button>
            {view === 'events' && (<MyEvents />)}
            {view === 'recipes' && (<MyRecipes />)}
        </div>
    )
}

export default ProfilePage;