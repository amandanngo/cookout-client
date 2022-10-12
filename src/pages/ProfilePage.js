import MyEvents from "../components/MyEvents";
import MyRecipes from "../components/MyRecipes";


function ProfilePage(){

    return(
        <div>
            <h1>Profile</h1>

            <MyEvents />
            <MyRecipes />
        </div>
    )
}

export default ProfilePage;