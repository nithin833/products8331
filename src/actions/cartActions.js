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

// Define variables to store applied savings
let appliedSavings = {
  Cheese: 0,
  Bread: 0,
  Butter: 0,
};

export const calculateAndApplySavings = (cartItems) => {
  return (dispatch) => {
    // Initialize savings object
    const savings = {};

    // Calculate savings for Cheese
    if (cartItems.Cheese >= 2) {
      const freeCheeseCount = Math.floor(cartItems.Cheese / 2);
      savings.Cheese = freeCheeseCount * productsAndPrices.Cheese;
    } else {
      appliedSavings.Cheese = 0; // Remove previously applied savings
    }

    // Calculate savings for Bread, limited to the lower of soups or breads
    const eligibleSoups = cartItems.Soup || 0;
    const eligibleBreads = cartItems.Bread || 0;
    const eligibleCount = Math.min(eligibleSoups, eligibleBreads);
    
    if (eligibleCount > 0) {
      const breadPrice = productsAndPrices.Bread / 2;
      savings.Bread = eligibleCount * breadPrice;
    } else {
      appliedSavings.Bread = 0; // Remove previously applied savings
    }

    // Calculate savings for Butter
    const priceInCents = productsAndPrices.Butter * 100;
    if (cartItems.Butter >= 1) {
      savings.Butter = cartItems.Butter * priceInCents / 300;
    } else {
      appliedSavings.Butter = 0; // Remove previously applied savings
    }

    // Update the applied savings with the current savings
    Object.assign(appliedSavings, savings);

    // Dispatch the savings to your store or wherever you handle them
    dispatch(applySavings(appliedSavings));
  };
};

