import Navigation from "../components/Navigation";
import MiniCart from "../components/MiniCart";
import banner from "../assets/banner.png"

function Home() {

    return(
        <div className="l-page">
            <div className="l-page--nav">
                <Navigation />
            </div>
            <main className="l-page--main">
                <h1 className="hd-page-title">Welcome...</h1>

                <div className="l-standard-content-area">
                    <div className="hero-banner">
                        <img src={banner} className="hero-banner" alt="Hero Banner" />
                    </div>

                    <p>
                        Welcome to JCH Cards Mock Shop. This app is basically a playing ground for me to practice or experiment with various web development concepts.
                        At the moment it is mainly to practice React concepts such as routing, context API, and many more.
                    </p>
                </div>
            </main>
            {/* <div className="l-page--cart">
                <MiniCart />
            </div> */}
        </div>
    )
}

export default Home