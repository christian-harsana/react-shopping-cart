import { useState, useEffect } from "react";
import type { ProductType } from "../types/common.type"
import Navigation from "../components/Navigation";
import ProductItem from "../components/ProductItem";
import MiniCart from "../components/MiniCart";
import './Shop.css';


interface ProductAPIResponse {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  cardmarket: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice: number;
      lowPrice: number;
      trendPrice: number;
      germanProLow: number;
      suggestedPrice: number;
      reverseHoloSell: number;
      reverseHoloLow: number;
      reverseHoloTrend: number;
      lowPriceExPlus: number;
      avg1: number;
      avg7: number;
      avg30: number;
      reverseHoloAvg1: number;
      reverseHoloAvg7: number;
      reverseHoloAvg30: number;
    };
  } | undefined;
}


function Shop() {

    const [products, setProducts] = useState<ProductType[] | []>([]);

    
    // EFFECTS
    // ------------------------------------------------

    useEffect(() => {

        const getProducts = async () => {

            try {
                const initShopParams = new URLSearchParams({
                    pageSize: '30',
                    select: 'id,name,images,cardmarket',
                    q: 'name:pikachu'
                });

                // Check local storage cache
                const cachedProduct = localStorage.getItem("product_initShopParams");

                if (cachedProduct) {
                    return cachedProduct;
                }

                // Fetch
                const response = await fetch(`https://api.pokemontcg.io/v2/cards?${initShopParams}`);
                
                // Check if reponse is ok
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();

                // Store in local storage for caching
                localStorage.setItem("product_initShopParams", JSON.stringify(data));

                return data;
            }
            catch (error) {
                console.error('Error fetch card:', error);
            }
        }

        getProducts().then((data) => {

            const productsData = typeof data === "string" ? JSON.parse(data) : data;
            let formattedProducts: ProductType[] | [] = [];

            productsData.data.map((product: ProductAPIResponse) => {

                formattedProducts = [...formattedProducts, {
                    id: product.id,
                    name: product.name,
                    imageURLSmall: product.images.small,
                    imageURLLarge: product.images.large,
                    price: product.cardmarket? product.cardmarket.prices.averageSellPrice : "not available",
                    quantityToAdd: 1
                }];
            });
            
            setProducts(formattedProducts);
        });

    }, []);


    // HANDLERS
    // ------------------------------------------------

    const onProductItemQuantityChange = (productId: string, quantity: number) => {

        setProducts(prevProducts => 
            prevProducts.map(product => product.id === productId ? {...product, quantityToAdd: quantity } : product)
        );
    };


    // RENDERS
    // ------------------------------------------------

    console.log("render shop page");

    return(
        <div className="l-page">
            <div className="l-page--nav">
                <Navigation />
            </div>

            <main className="l-page--main">
                <h1>Shop</h1>
                <div className="product-list">
                    {
                        products.map((product: ProductType) =>
                            <ProductItem 
                                key = {product.id} 
                                product = {product}
                                onQuantityChange = {onProductItemQuantityChange} 
                            />
                        )
                    }
                </div>
            </main>

            <div className="l-page--cart">
                <MiniCart />
            </div>
        </div>
    )
}

export default Shop