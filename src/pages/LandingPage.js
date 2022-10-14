import landingBanner from '../images/landing_banner.jpg'

function LandingPage(){

    return(
        <div>
            <div id='landing-banner'> 
                <div id='banner-overlay'>
                    <h3>Cookout</h3>
                    <h1>Create. Share. Host.</h1>
                </div>
            </div>

        <div id='about-us'>
            <h1>About Us</h1>
            <p>This site was built to allows users to share recipes 
            with each other and host dinner parties. It's meant to foster
            a community of home cooking and those trying to learn and
            have fun with cooking.</p>
        </div>
            
        </div>
    )
}

export default LandingPage;