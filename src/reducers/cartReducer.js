import { productsAndPrices } from '../common/ProductsAndPrices';

const initialState = {
  items: {
    Bread: 0,
    Milk: 0,
    Cheese: 0,
    Soup: 0,
    Butter: 0,
  },
  total: 0,
  savings: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const { product } = action.payload;
      return {
        ...state,
        items: {
          ...state.items,
          [product]: state.items[product] + 1,
        },
        total: state.total + productsAndPrices[product],
      };

    case 'REMOVE_FROM_CART':
      const { product: removeProduct } = action.payload;
      return {
        ...state,
        items: {
          ...state.items,
          [removeProduct]: state.items[removeProduct] - 1,
        },
        total: state.total - productsAndPrices[removeProduct],
      };

    case 'APPLY_SAVINGS':
      const { savings } = action.payload;
      return {
        ...state,
        savings: { ...state.savings, ...savings },
      };

    default:
      return state;
  }
};

export default cartReducer;
