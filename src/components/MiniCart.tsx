import { useContext, type ChangeEvent } from "react";
import { CartContext } from "../contexts/CartContext";
import type { CartItemType } from "../types/common.type";
import './Minicart.css';

// function MiniCartToggleButton() {
//     return (
//         <button type="button" className="mini-cart--toggle" aria-label="Toggle shopping cart" onClick={handleToggleCart}>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20">
//                 {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
//                 <path d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"/>
//             </svg>
//             <span className="mini-cart--toggle--count">{totalItemCount}</span>
//         </button>
//     )
// }

type CartItemProps = {
    item: CartItemType,
    onQuantityChange: (id: string, quantity: number) => void,
    onRemoveItem: (id: string) => void,
}

function CartItem({item, onQuantityChange, onRemoveItem}: CartItemProps) {

    const onCartItemQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {

        const value: number = parseInt(e.target.value) || 0;

        onQuantityChange(item.id, value);
    }

    console.log("Render Cart Item");

    return (
        <div className="cart-item" key={item.id}>
            <img className="cart-item--image" src={item.imageURLSmall} alt={`${item.name} image`} />
            <h3 className="cart-item--title">{item.name}</h3>
            <div className="cart-item--price">{`$${item.price}`}</div>
            <div className="cart-item--action">
                <input type="text" name={`${item.id}-qty-input`} value={item.quantityInCart} onChange={onCartItemQuantityChange} />
                <button type="button" className="cart-item--button" onClick={() => onRemoveItem(item.id)}>Remove</button>
            </div>
        </div>
    );
}

interface MiniCartContentProps {
    cartItems: CartItemType[],
    handleChangeQuantity: (itemId: string, newQuantity: number) => void,
    handleRemoveItemFromCart: (itemId: string) => void,
}

function MiniCartContent({cartItems, handleChangeQuantity, handleRemoveItemFromCart}: MiniCartContentProps) {

    console.log("Render Mini Cart Content");

    if (cartItems.length) {

        let totalPrice: number = cartItems.reduce((sum, item) => sum + (item.price * item.quantityInCart), 0);

        return (
            <>
                {cartItems.map((item) => 
                    <CartItem key={item.id} item={item} onQuantityChange={handleChangeQuantity} onRemoveItem={handleRemoveItemFromCart} />
                )}
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </>
        )
    }
    else {
        return <p>Your cart is empty.</p>;
    }
}

function MiniCart() {

    const { cartItems, removeFromCart, updateCartQuantity } = useContext(CartContext);
    // const [ isMiniCartVisible, setIsMiniCartVisibe ] = useState<boolean>(false);
    let totalItemCount = 0;
    
    if (cartItems.length) {
        for (const item of cartItems) {
            totalItemCount += item.quantityInCart
        }
    }

    // HANDLERS
    // ---------------------------------------------

    const handleChangeQuantity = (itemId: string, newQuantity: number) => {
        updateCartQuantity(itemId, newQuantity);
    };


    const handleRemoveItemFromCart = (itemId: string) => {
        removeFromCart(itemId);
    };

    // const handleToggleCart = () => {
    //     setIsMiniCartVisibe(!isMiniCartVisible);
    // }


    // RENDERS
    // ---------------------------------------------

    console.log("Render Mini Cart");

    return (
        <div className="mini-cart">
            {/* <MiniCartToggleButton /> */}

            <h2>Cart</h2>
            <MiniCartContent cartItems={cartItems} handleChangeQuantity={handleChangeQuantity} handleRemoveItemFromCart={handleRemoveItemFromCart} />
        </div>
    );
}

export default MiniCart;