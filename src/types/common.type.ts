export type ProductType = {
    id: string,
    name: string,
    imageURLSmall: string,
    price: number | "not available",
    quantityToAdd: number,
}

export type CartItemType = Omit<ProductType, 'imageURLLarge' | 'price' | 'quantityToAdd'> & {
    price: number;
    quantityInCart: number;
}