export const initialState = {
    cart: [],
    user: null,
    dataLength: null,
};

// Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state=initialState, action) => {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.item]
            }
        default: 
            return state;
    }
}

export { reducer };