import { useState, useEffect, type MouseEvent } from "react";
import type { ProductType } from "../types/common.type"
import Navigation from "../components/Navigation";
import ProductItem from "../components/ProductItem";
// import LoadingSpinner from "../components/LoadingSpinner";
// import MiniCart from "../components/MiniCart";
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

type PaginationProps = {
    itemsPerPage: number,
    totalItems: number,
    paginate: (number: number) => void,
    currentPage: number
}

const ProductListSkeleton = () => {
    return (
        <ul className="product-list">
            <li><div className="product-card-mock skeleton"></div></li>
            <li><div className="product-card-mock skeleton"></div></li>
            <li><div className="product-card-mock skeleton"></div></li>
            <li><div className="product-card-mock skeleton"></div></li>
            <li><div className="product-card-mock skeleton"></div></li>
            <li><div className="product-card-mock skeleton"></div></li>
            <li><div className="product-card-mock skeleton"></div></li>
            <li><div className="product-card-mock skeleton"></div></li>
            <li><div className="product-card-mock skeleton"></div></li>
        </ul>
    )
}


function Shop() {

    const [products, setProducts] = useState<ProductType[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);
    const [totalItems, setTotalItems] = useState(0);
    
    // EFFECTS
    // ------------------------------------------------

    useEffect(() => {

        const getProducts = async () => {

            try {
                setLoading(true);
                setError(null);

                const shopParams = new URLSearchParams({
                    page: String(currentPage),
                    pageSize: String(itemsPerPage),
                    select: 'id,name,images,cardmarket',
                    q: 'name:lucario'
                });

                // Check local storage cache
                const cachedProduct = localStorage.getItem(`product_shopParams_page_${currentPage}`);

                if (cachedProduct) {
                    console.log('return cached products');
                    setTotalItems(JSON.parse(cachedProduct).totalCount)
                    return cachedProduct;
                }

                // Fetch
                const response = await fetch(`https://api.pokemontcg.io/v2/cards?${shopParams}`);
                
                // Check if reponse is ok
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setTotalItems(data.totalCount);

                // Store in local storage for caching
                localStorage.setItem(`product_shopParams_page_${currentPage}`, JSON.stringify(data));

                console.log('return fetched product');
                return data;
            }
            catch (error) {
                console.error('Error fetch card:', error);
                
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        }

        getProducts().then((data) => {

            if (typeof data !== "undefined") {

                const productsData = typeof data === "string" ? JSON.parse(data) : data;
                let formattedProducts: ProductType[] | [] = [];

                console.log(productsData);

                productsData.data.map((product: ProductAPIResponse) => {

                    formattedProducts = [...formattedProducts, {
                        id: product.id,
                        name: product.name,
                        imageURLSmall: product.images.small,
                        price: product.cardmarket? product.cardmarket.prices.averageSellPrice : "not available",
                        quantityToAdd: 1
                    }];
                });
                
                setProducts(formattedProducts);
                setError(null);
                setLoading(false);
            }
        });

    }, [currentPage, itemsPerPage]);


    // HANDLERS
    // ------------------------------------------------

    const onProductItemQuantityChange = (productId: string, quantity: number) => {

        setProducts(prevProducts => 
            prevProducts.map(product => product.id === productId ? {...product, quantityToAdd: quantity } : product)
        );
    };


    // SUB COMPONENTS
    // ------------------------------------------------

    const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}: PaginationProps) => {

        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        const onPageNumberClick = (e:MouseEvent<HTMLElement>, pageNumber: number) => {
            e.preventDefault();
            paginate(pageNumber);
        }

        return(
            <nav>
                <ul className="pagination">
                    {pageNumbers.map((number) => (
                        <li key={number} className={`pagination-item ${currentPage === number ? "s-page-active" : ""}`}>
                            <a onClick={(e) => onPageNumberClick(e, number)} href="!#" className="button btn-primary-outline">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }

    const ProductList = ({products} : {products: ProductType[] | []}) => {

        return (
            <ul className="product-list">
                {
                    products.map((product: ProductType) =>
                        <li key = {product.id}>
                            <ProductItem  
                                product = {product}
                                onQuantityChange = {onProductItemQuantityChange} 
                            />
                        </li>
                    )
                }
            </ul>
        )
    }

    // RENDERS
    // ------------------------------------------------

    console.log("render shop page");

    return(
        <div className="l-page">
            <div className="l-page--nav">
                <Navigation />
            </div>

            <main className="l-page--main">

                <h1 className="hd-page-title">Shop</h1>

                <div className="product-area">
                    {error && <p><strong>Error:</strong> {error}</p> }

                    {loading ? <ProductListSkeleton /> : <ProductList products={products} />}

                    <Pagination 
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        currentPage={currentPage}
                        paginate={setCurrentPage}
                    />
                </div>
            </main>

            {/* <div className="l-page--cart">
                <MiniCart />
            </div> */}
        </div>
    )

    
}

export default Shop