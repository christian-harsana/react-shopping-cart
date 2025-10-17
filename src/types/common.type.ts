export type ProductType = {
    id: string,
    name: string,
    imageURLSmall: string,
    price: number | "not available",
    quantityToAdd: number,
}

export type CartItemType = Omit<ProductType, 'price' | 'quantityToAdd'> & {
    price: number;
    quantityInCart: number;
}