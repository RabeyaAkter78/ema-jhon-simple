import React from 'react';
import './Cart.css'

const Cart = ({ cart }) => {
    // const cart=props.cart//option-1
    // const { cart } = props //option-2
    console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    for (const product of cart) {
        totalPrice = totalPrice + product.price;
        totalShipping = totalShipping + product.shipping
    }

    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
        <div className='cart'>
            <h3>Order summery</h3>
            <h4>Selected Items: {cart.length}</h4>
            <p>Total Price:${totalPrice}</p>
            <p>Total Shipping:{totalShipping}</p>
            <p>Tax:${tax .toFixed(2)}</p>
            <p>Grand Total:${grandTotal .toFixed(2)}</p>


        </div>
    );
};

export default Cart;