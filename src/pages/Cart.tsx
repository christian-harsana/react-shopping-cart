import Navigation from "../components/Navigation";
import MiniCart from "../components/MiniCart";

function Cart() {

    return(
        <div className="l-page">
            <div className="l-page--nav">
                <Navigation />
            </div>
            <main className="l-page--main">
                <h1>Cart</h1>
                <p>Cart page here...</p>
            </main>
            <div className="l-page--cart">
                <MiniCart/>
            </div>
        </div>
    )
}

export default Cart