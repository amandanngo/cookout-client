import EventsFeed from "../components/EventsFeed";
import RecipesFeed from "../components/RecipesFeed";
import { useState} from 'react';

function HomePage(){
    
    const [view,setView] = useState('recipes')

    const viewEvents = () => {
        setView('events')
    }
    const viewRecipes = () => {
        setView('recipes')
    }

    return(
        <div id="home">
            <div className="nav-banner"></div>
            <button onClick={viewEvents}>Events</button>
            <button onClick={viewRecipes}>Recipes</button>
            {view === 'events' && (<EventsFeed />)}
            {view === 'recipes' && (<RecipesFeed />)}
        </div>
    )
}

export default HomePage;