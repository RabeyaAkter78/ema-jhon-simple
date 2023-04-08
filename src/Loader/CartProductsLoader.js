import { getShoppingCart } from "../component/utilities/fakedb";

const cartProductsLoader = async () => {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    // if cart data is in database,you have to use async await:
    const storedCart = getShoppingCart();

    const savedCarts = [];

    for (const id in storedCart) {
        const addedProduct = products.find(pd => pd.id === id);

        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCarts.push(addedProduct);
        }
    }

    // if you need to send two things
    // return[products,savedCart];
    // Another options:
    // return{product,cart:savedCart}

    return savedCarts;
}
export default cartProductsLoader;