export type Product = {
    id: string,
    name: string,
    imageURLSmall: string,
    imageURLLarge: string,
    price: number | "not available",
    quantityToAdd: number,
}

export type CartItem = Omit<Product, 'imageURLLarge' | 'price' | 'quantityToAdd'> & {
    price: number;
    quantityInCart: number;
}