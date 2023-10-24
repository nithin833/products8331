import './ProductsList.css';
import React from 'react';
import { connect } from 'react-redux';
import { addToCart, calculateAndApplySavings } from '../actions/cartActions';
import CartSummary from './CartSummary';
import { productsAndPrices } from '../common/ProductsAndPrices';

const ProductsList = (props) => {
  const { addToCart, cart, calculateAndApplySavings } = props;

  const products = Object.keys(productsAndPrices);

  const handleAddToCart = (product) => {
    addToCart(product);
    const newCartItems = { ...cart.items, [product]: cart.items[product] + 1 };
    calculateAndApplySavings(newCartItems);
  };

  return (
    <div class="product-list">
       <div class="left-side">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product}>
              <div class="container">
                <div class="left-aligned"><b>{product}</b> </div>
                <div class="right-aligned">
                  <div class="price-element"><b>£ {productsAndPrices[product].toFixed(2)}{' '}</b></div>
                  <div><button class="button" onClick={() => handleAddToCart(product)}>Add</button></div>
                </div>
              </div>
              <div class="line"></div>
            </li>
          ))}
        </ul>
      </div>
      <div class="right-side">
        <CartSummary />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addToCart, calculateAndApplySavings })(
  ProductsList
);
