import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../utilities/fakedb';
import './Shop.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCoffee, faTrash } from '@fortawesome/free-solid-svg-icons'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];

        //step:1 :grt id:
        for (const id in storedCart) {

            //step 2: get the product by using id:
            const addedProduct = products.find(product => product.id == id)
            if (addedProduct) {

                //step 3: get quantity of the product:
                const quantity = storedCart[id]
                addedProduct.quantity = quantity

                //step 4: add the addedProduct to the savedCart:
                savedCart.push(addedProduct);
            }
            console.log(addedProduct);
        }
        //step 5: set the cart:
        setCart(savedCart);

    }, [products])


    const handleAddToCart = (product) => {
        let newCart = [];
        // const newCart = [...cart, product];
        //if product doesn't exist in the cart , then set quantity=1;
        //if exist update quantity by 1
        const exist = cart.find(pd => pd.id === product.id);
        if (!exist) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exist.quantity = exist.quantity + 1;
            const remaining = cart.filter(pd => pd.d !== product.id);
            newCart = [...remaining, exist];
        }

        setCart(newCart);
        addToDb(product.id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}

                >
                    <Link className='proceed-link' to='/orders'>
                        <button className='btn-proceed'>
                            Review orders
                            <FontAwesomeIcon className='' icon={faArrowRight}></FontAwesomeIcon>
                            </button>
                    </Link>
                </Cart>

            </div>

        </div>
    );
};

export default Shop;