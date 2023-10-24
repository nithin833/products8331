import './CartSummary.css';
import React from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, calculateAndApplySavings} from '../actions/cartActions';
import { productsAndPrices } from '../common/ProductsAndPrices';

const CartSummary = (props) => {
  const { cart, addToCart, removeFromCart, calculateAndApplySavings } = props;

  const { items } = cart;
  const nonZeroItems = Object.keys(items).filter((product) => items[product] > 0);

  const handleAddToCart = (product) => {
    addToCart(product);
    const newCartItems = { ...cart.items, [product]: cart.items[product] + 1 };
    calculateAndApplySavings(newCartItems);
  };

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    const newCartItems = { ...cart.items, [product]: cart.items[product] - 1 };
    calculateAndApplySavings(newCartItems);
  };

  const renderBasketItems = () => {
    const { savings } = cart;
    const itemRows = [];
    nonZeroItems.forEach((product) => {
      itemRows.push(
        <tr key={`${product}-row`}>
          <td style={{ fontWeight: 'bold' }}>{product}</td>
<td style={{ fontWeight: 'bold' }}>£{productsAndPrices[product].toFixed(2)}</td>
          <td>
            <div class="space-between">
              <div class="add-button">
                <button className="outlined-button" onClick={() => handleAddToCart(product)}>
                  +
                </button>
              </div>
                {items[product]}
              <div class="remove-button">
                <button className="outlined-button" onClick={() => handleRemoveFromCart(product)}>
                  -
                </button>
              </div>
            </div>
          </td>
        </tr>
      );

      itemRows.push(
        <tr key={`${product}-total-price-row`} style={{ color: '#606060' }}>
          <td colSpan="4" style={{ textAlign: 'right' , fontWeight:'bold'}}>
            {`Item price £${productsAndPrices[product].toFixed(2)} * ${items[product]} = £${(
              productsAndPrices[product] * items[product]
            ).toFixed(2)}`}
          </td>
        </tr>
      );


      if (savings[product]) {
        itemRows.push(
          <tr key={`${product}-savings-row`} style={{ color: 'red' }}>
            <td colSpan="4" style={{ textAlign: 'right', fontWeight:'bold', fontStyle:'italic'}}>{`Savings £${savings[product].toFixed(2)}`}</td>
          </tr>
        );
      }

      const totalCost = productsAndPrices[product]*items[product] - (savings[product] || 0);
      itemRows.push(
        <tr key={`${product}-total-cost-row`} style={{ marginBottom: '20px' }}>
         <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>{`Item cost £${totalCost.toFixed(2)}`}</td>
        </tr>
      );
    });

    return itemRows;
  };

  const calculateSubtotal = () => {
    const { items } = cart;

    let subtotal = 0;
    for (const product in items) {
      subtotal += items[product] * productsAndPrices[product];
    }

    return subtotal.toFixed(2);
  };

  const calculateTotalSavings = () => {
    const { savings } = cart;

    let totalSavings = 0;
    for (const product in savings) {
      totalSavings += savings[product];
    }

    return totalSavings.toFixed(2);
  };

  const calculateFinalTotal = () => {
    const subtotal = calculateSubtotal();
    const totalSavings = calculateTotalSavings();

    return (subtotal - totalSavings).toFixed(2);
  };


  return (
    <div>
      <h1>Basket</h1>
      <table>
        <tbody>{renderBasketItems()}</tbody>
      </table>
      
      <p>
        <div class="container">
          <div class="text-align-left"><b>Sub Total: </b></div>
          <div class="text-align-right">£ {calculateSubtotal()}</div>
          </div>
      </p>
      <p>
        <div class="container">
          <div class="text-align-left"><b>Savings: </b> </div>
          <div class="text-align-right">£ {calculateTotalSavings()}</div>
          </div>
      </p>
      <p>
        <div class="container">
          <div class="text-align-left"><b>Total Amount:</b> </div>
          <div class="text-align-right">£ {calculateFinalTotal()}</div>
          </div>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addToCart, removeFromCart, calculateAndApplySavings })(
  CartSummary
  );
