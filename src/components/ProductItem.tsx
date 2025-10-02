import type { ChangeEvent } from "react";
import type { CartItem, Product } from "../types/common.type";
import "./ProductItem.css";

type ProductItemProps = {
    product: Product,
    onQuantityChange: (productId: string, quantity: number) => void,
    onAddItemToCart: (props: CartItem) => void
}

function ProductItem({product, onQuantityChange, onAddItemToCart}: ProductItemProps) {

    const productTitle = `${product.name} (${product.id})`;
    const priceDisplay: string = product.price === "not available" ? "Not Available" : `$${product.price}`;
    const isProductAvailable: boolean = product.price === "not available" ? false : true;
    const isDecreaseButtonDisabled: boolean = product.quantityToAdd <= 1 ? true : false;
    const isAddButtonDisabled: boolean = !isProductAvailable || product.quantityToAdd < 1 ? true : false; 

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

        const itemToAdd: CartItem = {
            id: product.id,
            name: productTitle,
            imageURLSmall: product.imageURLSmall,
            price: product.price === "not available" ? 0 : product.price,
            quantityInCart: product.quantityToAdd
        }

        onAddItemToCart(itemToAdd);
    }

    // RENDERS
    // ------------------------------------------------

    return (
        <div className="product-card" key={product.id}>
            <img className="product-card--image" src={product.imageURLSmall} alt={`${product.name} image`} />
            <h3 className="product-card--title">{productTitle}</h3>
            <div className="product-card--price">{priceDisplay}</div>
            <div className="product-card--action">
                <button type="button" name="substract" disabled={isDecreaseButtonDisabled} onClick={handleSubstractQuantity}>-</button>
                <input type="text" name={`${product.id}-qty-input`} value={product.quantityToAdd} onChange={(e) => handleChangeQuantity(e)} />
                <button type="button" name="add" onClick={handleAddQuantity}>+</button>
                <button type="button" className="product-card--button" disabled={isAddButtonDisabled} onClick={handleAddItemToCart}>Add to cart</button>
            </div>
        </div>
    )
};

export default ProductItem;