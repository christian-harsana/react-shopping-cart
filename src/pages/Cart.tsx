import { useContext, type ChangeEvent } from "react";
import Navigation from "../components/Navigation";
// import MiniCart from "../components/MiniCart";
import { CartContext } from "../contexts/CartContext";
import type { CartItemType } from "../types/common.type";
import './Cart.css';

type CartBodyProps = {
    cartItems: CartItemType[],
    onRemoveItem: (itemId: string) => void,
    onQuantityChange: (itemId: string, quantity: number) => void,
}

function CartBody({cartItems, onRemoveItem, onQuantityChange} : CartBodyProps) {

    // ---------------------------------
    // HANDLERS
    // ---------------------------------

    const onCartBodyItemQuantityChange = (e: ChangeEvent<HTMLInputElement>, itemId: string) => {

        let newQuantity: number = Math.min(99, Math.max(1, parseInt(e.target.value) || 1));

        onQuantityChange(itemId, newQuantity);
    };

    const onCartBodyQuantityAdd = (itemId: string, quantity: number) => {

        const newQuantity = quantity > 99 ? 99 : quantity;

        onQuantityChange(itemId, newQuantity);
    };

    const onCartBodyQuantitySubstract = (itemId: string, quantity: number) => {

        const newQuantity = quantity < 0 ? 0 : quantity;

        onQuantityChange(itemId, newQuantity);
    }

    // ---------------------------------
    // RENDERS
    // ---------------------------------

    if (cartItems.length < 1) return <tr><td colSpan={5}>There is currently no item in the cart.</td></tr>;

    return(
        <>
            {cartItems.map((item) => {           
                const total = item.price * item.quantityInCart;

                return(
                    <tr key={item.id}>
                        <td>
                            <div className="cart-product">
                                <div className="cart-product--image">
                                    <img src={item.imageURLSmall} alt={`${item.name} image`} />
                                </div>
                                <div className="cart-product--name">{item.name}</div>
                            </div>
                        </td>
                        <td>{`$${item.price.toFixed(2)}`}</td>
                        <td>
                            <div className="cart-quantity">
                                <button type="button" className="btn-primary-outline" name="substract" onClick={() => onCartBodyQuantitySubstract(item.id, item.quantityInCart - 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10">
                                        {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                        <path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/>
                                    </svg>
                                </button>
                                <input type="text" value={item.quantityInCart} name={`${item.id}-quantity`} onChange={(e) => onCartBodyItemQuantityChange(e, item.id)} />
                                <button type="button" className="btn-primary-outline" name="add" onClick={() => onCartBodyQuantityAdd(item.id, item.quantityInCart + 1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10">
                                        {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                                        <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/>
                                    </svg>
                                </button>
                            </div>
                        </td>
                        <td>{`$${total.toFixed(2)}`}</td>
                        <td><button type="button" className="btn-primary btn-small" onClick={() => onRemoveItem(item.id)}>Remove</button></td>
                    </tr> 
                );
            })} 
        </>
    )

}


function Cart() {

    const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext);
    const subTotal: number = cartItems.reduce((sum, item) => sum + (item.quantityInCart * item.price), 0);


    // ---------------------------------
    // RENDERS
    // ---------------------------------

    return(
        <div className="l-page">
            <div className="l-page--nav">
                <Navigation />
            </div>
            <main className="l-page--main">
                <h1 className="hd-page-title">Cart</h1>

                <div className="l-standard-content-area">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <CartBody cartItems={cartItems} onRemoveItem={removeFromCart} onQuantityChange={updateCartQuantity} />
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className="u-text-align-right">Subtotal:</td>
                                <td colSpan={2}>{`$${subTotal.toFixed(2)}`}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </main>
            {/* <div className="l-page--cart">
                <MiniCart/>
            </div> */}
        </div>
    )
}

export default Cart