import Navigation from "../components/Navigation";
import MiniCart from "../components/MiniCart";

function Home() {

    return(
        <div className="l-page">
            <div className="l-page--nav">
                <Navigation />
            </div>
            <main className="l-page--main">
                <h1>Home</h1>
                <p>Home page here...</p>
            </main>
            <div className="l-page--cart">
                <MiniCart />
            </div>
        </div>
    )
}

export default Home