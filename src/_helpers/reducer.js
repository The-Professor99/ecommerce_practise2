import { alertService } from '@/_services';

let localCart;
let localUser;
if (localStorage.getItem('carts')) {
    localCart = JSON.parse(localStorage.getItem("carts"));
} else {
    localCart = []
}

if (localStorage.getItem('user-account-test-ecommerce')) {
    localUser = JSON.parse(localStorage.getItem("user-account-test-ecommerce"));
} else {
    localUser = null
}




export const initialState = {
    cart: localCart,
    user: localUser,
    alerts: []
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
                // alertService.error("Item already added, updating", { keepAfterRouteChange: true, autoClose: false  });
                localStorage.setItem('carts', JSON.stringify([...newCarta, action.item]));
                return {
                    ...state,
                    cart: [...newCarta, action.item]
                }
                
            } else {
                console.log('1', action)
                // alertService.success("New Item is being added to cart", { keepAfterRouteChange: false, autoClose: false  });
                console.log('2', action)
                localStorage.setItem('carts', JSON.stringify([...state.cart, action.item]));
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
            localStorage.setItem('carts', JSON.stringify(newCart));
            return {
                ...state,
                cart: newCart
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'UPDATE_ALERTS':
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            }
        case 'SELECT_KEEPS':
            return {
                ...state,
                alerts: action.alerts
            }
        case 'REMOVE_ALERT':
            const filteredAlerts = state.alerts.filter(x => x !== action.alert);
            return {
                ...state,
                alerts: filteredAlerts
            }
        default: 
            return state;
    }
}

export { reducer };