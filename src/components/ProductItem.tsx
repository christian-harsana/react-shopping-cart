import { useContext, type ChangeEvent } from "react";
import type { CartItemType, ProductType } from "../types/common.type";
import { CartContext } from "../contexts/CartContext";
import SubstractButtonIcon from "./SubstractButtonIcon";
import AddButtonIcon from "./AddButtonIcon";
import "./ProductItem.css";

type ProductItemProps = {
    product: ProductType,
    onQuantityChange: (productId: string, quantity: number) => void
}

function ProductItem({product, onQuantityChange}: ProductItemProps) {

    const productTitle = `${product.name} (${product.id})`;
    const priceDisplay: string = product.price === "not available" ? "Not Available" : `$${product.price.toFixed(2)}`;
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
                    <SubstractButtonIcon />
                    <span className="u-screen-reader-only">Substract quantity</span>
                </button>
                <label htmlFor={`${product.id}-product-qty-input`} className="u-screen-reader-only">Quantity for {product.name}</label>
                <input type="text" id={`${product.id}-product-qty-input`} value={product.quantityToAdd} onChange={(e) => handleChangeQuantity(e)} />
                <button type="button" className="btn-primary-outline" name="add" onClick={handleAddQuantity}>
                    <AddButtonIcon />
                    <span className="u-screen-reader-only">Add quantity</span>
                </button>
            </div>
            <button type="button" className="btn-primary" disabled={isAddButtonDisabled} onClick={handleAddItemToCart}>Add to cart</button>
        </div>
    )
};

export default ProductItem;