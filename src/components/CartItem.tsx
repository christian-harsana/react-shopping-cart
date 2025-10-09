import { type ChangeEvent } from "react";
import type { CartItemType } from "../types/common.type";

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

export default CartItem;