import { productsAndPrices } from '../common/ProductsAndPrices';

export const addToCart = (product) => {
  return { type: 'ADD_TO_CART', payload: { product } };
};

export const removeFromCart = (product) => {
  return { type: 'REMOVE_FROM_CART', payload: { product } };
};

export const applySavings = (savings) => {
  return { type: 'APPLY_SAVINGS', payload: { savings } };
};

export const calculateAndApplySavings = (cartItems) => {
  return (dispatch) => {
    const savings = {};

    if (cartItems.Cheese >= 2) {
      const freeCheeseCount = Math.floor(cartItems.Cheese / 2);
      savings.Cheese = freeCheeseCount * productsAndPrices.Cheese;
    }

    if (cartItems.Soup >= 1) {
      const breadPrice = productsAndPrices.Bread / 2;
      savings.Bread = cartItems.Soup * breadPrice;
    }

    const priceInCents = productsAndPrices.Butter * 100;
    if (cartItems.Butter >= 1) {
      savings.Butter = cartItems.Butter * priceInCents / 300;
    }

    dispatch(applySavings(savings));
  };
};
