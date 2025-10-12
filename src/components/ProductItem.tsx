import { useContext, type ChangeEvent } from "react";
import type { CartItemType, ProductType } from "../types/common.type";
import { CartContext } from "../contexts/CartContext";
import "./ProductItem.css";

type ProductItemProps = {
    product: ProductType,
    onQuantityChange: (productId: string, quantity: number) => void
}

function ProductItem({product, onQuantityChange}: ProductItemProps) {

    const productTitle = `${product.name} (${product.id})`;
    const priceDisplay: string = product.price === "not available" ? "Not Available" : `$${product.price}`;
    const isProductAvailable: boolean = product.price === "not available" ? false : true;
    const isDecreaseButtonDisabled: boolean = product.quantityToAdd <= 1 ? true : false;
    const isAddButtonDisabled: boolean = !isProductAvailable || product.quantityToAdd < 1 ? true : false; 
    const {addToCart} = useContext(CartContext);


    // HANDLERS
    // ------------------------------------------------

    function handleAddQuantity() {
        onQuantityChange(product.id, product.quantityToAdd + 1);
    }

    function handleSubstractQuantity() {
        onQuantityChange(product.id, product.quantityToAdd - 1);
    }

    function handleChangeQuantity(e:ChangeEvent<HTMLInputElement>) {

        const newQuantity = parseInt(e.target.value) || 0;
        onQuantityChange(product.id, newQuantity);
    }

    function handleAddItemToCart() {

        const itemToAdd: CartItemType = {
            id: product.id,
            name: productTitle,
            imageURLSmall: product.imageURLSmall,
            price: product.price === "not available" ? 0 : product.price,
            quantityInCart: product.quantityToAdd
        }

        addToCart(itemToAdd);
    }

    // RENDERS
    // ------------------------------------------------

    return (
        <div className="product-card" key={product.id}>
            <div className="product-card--image">
                <img src={product.imageURLSmall} alt={`${product.name} image`} />
            </div>
            <h3 className="product-card--title">{productTitle}</h3>
            <div className="product-card--price">{priceDisplay}</div>
            <div className="product-card--qty">
                <button type="button" className="btn-primary-outline" name="substract" disabled={isDecreaseButtonDisabled} onClick={handleSubstractQuantity}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10">
                        {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                        <path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/>
                    </svg>
                </button>
                <input type="text" name={`${product.id}-qty-input`} value={product.quantityToAdd} onChange={(e) => handleChangeQuantity(e)} />
                <button type="button" className="btn-primary-outline" name="add" onClick={handleAddQuantity}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10">
                        {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
                        <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"/>
                    </svg>
                </button>
            </div>
            <button type="button" className="btn-primary" disabled={isAddButtonDisabled} onClick={handleAddItemToCart}>Add to cart</button>
        </div>
    )
};

export default ProductItem;