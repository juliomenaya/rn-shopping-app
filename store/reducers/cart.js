import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';

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
            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }
            
            console.log('Adding product to cart')
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
    
        default:
            return state;
    }
}
