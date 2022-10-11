import EventsFeed from "../components/EventsFeed";
import RecipesFeed from "../components/RecipesFeed";


function HomePage(){
    

    return(
        <div>
            <h1>Home</h1>
            <EventsFeed />
            <RecipesFeed />
        </div>
    )
}

export default HomePage;