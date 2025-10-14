import { NavLink } from "react-router";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "./Navigation.css"
import logo from "../assets/logo.png"

function Navigation() {

    const {cartItems} = useContext(CartContext);
    let totalItemCount = 0;
    
    if (cartItems.length) {
        for (const item of cartItems) {
            totalItemCount += item.quantityInCart
        }
    }

    return (
        <>
            <div className="logo">
                <img src={logo} alt="JCH Card Shop Logo" />
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" aria-hidden="true">
                                {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                <path d="M341.8 72.6C329.5 61.2 310.5 61.2 298.3 72.6L74.3 280.6C64.7 289.6 61.5 303.5 66.3 315.7C71.1 327.9 82.8 336 96 336L112 336L112 512C112 547.3 140.7 576 176 576L464 576C499.3 576 528 547.3 528 512L528 336L544 336C557.2 336 569 327.9 573.8 315.7C578.6 303.5 575.4 289.5 565.8 280.6L341.8 72.6zM304 384L336 384C362.5 384 384 405.5 384 432L384 528L256 528L256 432C256 405.5 277.5 384 304 384z"/>
                            </svg>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" aria-hidden="true">
                                {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                <path d="M53.5 245.1L110.3 131.4C121.2 109.7 143.3 96 167.6 96L472.5 96C496.7 96 518.9 109.7 529.7 131.4L586.5 245.1C590.1 252.3 592 260.2 592 268.3C592 295.6 570.8 318 544 319.9L544 512C544 529.7 529.7 544 512 544C494.3 544 480 529.7 480 512L480 320L384 320L384 496C384 522.5 362.5 544 336 544L144 544C117.5 544 96 522.5 96 496L96 319.9C69.2 318 48 295.6 48 268.3C48 260.3 49.9 252.3 53.5 245.1zM160 320L160 432C160 440.8 167.2 448 176 448L304 448C312.8 448 320 440.8 320 432L320 320L160 320z"/>
                            </svg>
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" aria-hidden="true">
                                {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                <path d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                            </svg>
                            Cart&nbsp;<span>({totalItemCount})</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navigation;