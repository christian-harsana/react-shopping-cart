import { useState, useContext, type ChangeEvent } from "react";
import type { CartItemType, ProductType } from "../types/common.type";
import { CartContext } from "../contexts/CartContext";
import SubstractButtonIcon from "./SubstractButtonIcon";
import AddButtonIcon from "./AddButtonIcon";
import "./ProductItem.css";

type ProductItemProps = {
    product: ProductType,
    onQuantityChange: (productId: string, quantity: number) => void
}

function CheckIcon () {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true" width="16">
            {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
            <path d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zM374 145.7c-10.7-7.8-25.7-5.4-33.5 5.3L221.1 315.2 169 263.1c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72c5 5 11.8 7.5 18.8 7s13.4-4.1 17.5-9.8L379.3 179.2c7.8-10.7 5.4-25.7-5.3-33.5z"/>
        </svg>
    )
}

function ProductItem({product, onQuantityChange}: ProductItemProps) {

    const [addedToCart, setAddedToCart] = useState(false);
    const {addToCart} = useContext(CartContext);
    const productTitle = `${product.name} (${product.id})`;
    const priceDisplay: string = product.price === "not available" ? "Not Available" : `$${product.price.toFixed(2)}`;
    const isProductAvailable: boolean = product.price === "not available" ? false : true;
    const isDecreaseButtonDisabled: boolean = product.quantityToAdd <= 1 ? true : false;
    const isAddButtonDisabled: boolean = !isProductAvailable || product.quantityToAdd < 1 ? true : false; 
    

    // HANDLERS
    // ------------------------------------------------

    function onAddQuantity() {
        onQuantityChange(product.id, product.quantityToAdd + 1);
    }

    function onSubstractQuantity() {
        onQuantityChange(product.id, product.quantityToAdd - 1);
    }

    function onChangeQuantity(e:ChangeEvent<HTMLInputElement>) {

        const newQuantity = parseInt(e.target.value) || 0;
        onQuantityChange(product.id, newQuantity);
    }

    function onAddItemToCart() {

        const itemToAdd: CartItemType = {
            id: product.id,
            name: productTitle,
            imageURLSmall: product.imageURLSmall,
            price: product.price === "not available" ? 0 : product.price,
            quantityInCart: product.quantityToAdd
        }

        addToCart(itemToAdd);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1500);
    }

    // RENDERS
    // ------------------------------------------------

    return (
        <div className="product-card" key={product.id}>
            <div className="product-card--image">
                <img src={product.imageURLSmall} alt={`${product.name} image`} />
            </div>
            <h3 className="product-card--title">
                {product.name}<br/>
                ({product.id})
            </h3>
            <div className="product-card--price">{priceDisplay}</div>
            <div className="product-card--qty">
                <button type="button" className="btn-primary-outline" name="substract" disabled={isDecreaseButtonDisabled} onClick={onSubstractQuantity}>
                    <SubstractButtonIcon />
                    <span className="u-screen-reader-only">Substract quantity</span>
                </button>
                <label htmlFor={`${product.id}-product-qty-input`} className="u-screen-reader-only">Quantity for {product.name}</label>
                <input type="text" id={`${product.id}-product-qty-input`} value={product.quantityToAdd} onChange={(e) => onChangeQuantity(e)} />
                <button type="button" className="btn-primary-outline" name="add" onClick={onAddQuantity}>
                    <AddButtonIcon />
                    <span className="u-screen-reader-only">Add quantity</span>
                </button>
            </div>
            <button type="button" className="btn-primary" disabled={isAddButtonDisabled} onClick={onAddItemToCart}>
                {addedToCart? <><CheckIcon /> Added to cart</> : "Add to cart"}
            </button>
        </div>
    )
};

export default ProductItem;