import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},  // will allow us to add item.id as key and quantity as value
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            const pushToken = addedProduct.pushToken;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    pushToken,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, pushToken, prodPrice);
            }
            
            return {
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }
        
        case REMOVE_FROM_CART:
            const currentCartItem = state.items[action.pid];
            let updatedCartItems;
            if (currentCartItem.quantity === 1) {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
                // return {
                //     items: { ...updatedCartItems },
                //     totalAmount: state.totalAmount - cartItem.productPrice
                // };
            } else {
                const newCartItem = {...currentCartItem, quantity: currentCartItem.quantity - 1, sum: currentCartItem.sum - currentCartItem.productPrice}
                updatedCartItems = {...state.items, [action.pid]: newCartItem };
            }
            return {
                items: updatedCartItems,
                totalAmount: state.totalAmount - currentCartItem.productPrice
            };
        
        // actions can be cases of other reducers too
        // ADD_ORDER is handled in orders recuder
        case ADD_ORDER:
            return initialState;
        
        case DELETE_PRODUCT:
            if (!state.items[action.pid])
                return state;

            const updatedItems = {...state.items};
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[actions.pid];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    
        default:
            return state;
    }
}
