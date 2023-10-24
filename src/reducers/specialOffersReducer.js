
const initialState = {
    cheeseBOGO: true, 
    soupBreadHalfPrice: true,
    thirdOffButter: true 
  };
  
  const specialOffersReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case 'TOGGLE_CHEESE_OFFER':
        return {
          ...state,
          cheeseBOGO: !state.cheeseBOGO,
        };
      case 'TOGGLE_SOUP_BREAD_OFFER':
        return {
          ...state,
          soupBreadHalfPrice: !state.soupBreadHalfPrice,
        };
      case 'TOGGLE_BUTTER_OFFER':
        return {
          ...state,
          thirdOffButter: !state.thirdOffButter,
        };
      default:
        return state;
    }
  };
  
  export default specialOffersReducer;
  