import { useContext, type ChangeEvent } from "react";
import Navigation from "../components/Navigation";
import SubstractButtonIcon from "../components/SubstractButtonIcon";
import AddButtonIcon from "../components/AddButtonIcon";
// import MiniCart from "../components/MiniCart";
import { CartContext } from "../contexts/CartContext";
import type { CartItemType } from "../types/common.type";
import './Cart.css';

type CartBodyProps = {
    cartItems: CartItemType[],
    onRemoveItem: (itemId: string) => void,
    onQuantityChange: (itemId: string, quantity: number) => void,
}

export function CartBody({cartItems, onRemoveItem, onQuantityChange} : CartBodyProps) {

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
                                    <SubstractButtonIcon />
                                    <span className="u-screen-reader-only">Substract Quantity</span>
                                </button>
                                <label htmlFor={`${item.id}-cart-quantity`} className="u-screen-reader-only">Quantity for {item.name}</label>
                                <input type="text" id={`${item.id}-cart-quantity`} value={item.quantityInCart} onChange={(e) => onCartBodyItemQuantityChange(e, item.id)} />
                                <button type="button" className="btn-primary-outline" name="add" onClick={() => onCartBodyQuantityAdd(item.id, item.quantityInCart + 1)}>
                                    <AddButtonIcon />
                                    <span className="u-screen-reader-only">Add Quantity</span>
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