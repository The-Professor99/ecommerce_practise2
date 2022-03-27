export const initialState = {
    cart: [],
    user: null
};

// Selector
export const getCartTotal = (cart) =>
    cart?.reduce((amount, item) => (item.price * item.quantity)  + amount, 0)

const reducer = (state=initialState, action) => {
    console.log(action);
    switch(action.type) {
        case 'ADD_TO_CART':
            const indexa = state.cart.findIndex(
                (cartitem) => cartitem.id === action.item.id
            )
            let newCarta = [...state.cart];
            if (indexa >= 0) {
                newCarta.splice(indexa, 1);
                alert("Item already added, updating")
                return {
                    ...state,
                    cart: [...newCarta, action.item]
                }
                
            } else {
                alert("New Item is being added to cart")
                return {
                    ...state,
                    cart: [...state.cart, action.item]
                }
            }
        case 'REMOVE_FROM_BASKET':
            const index = state.cart.findIndex(
                (cartitem) => cartitem.id === action.item.id
            )
            let newCart = [...state.cart];
            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn("cannot remove product. Not in cart")
            }
            return {
                ...state,
                cart: newCart
            }
        default: 
            return state;
    }
}

export { reducer };