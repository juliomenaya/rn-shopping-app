import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        try {
            // execute any async code here
            const response = await fetch('https://rn-shopping-app-db087-default-rtdb.firebaseio.com/orders/u1.json');
            
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const resData = await response.json();
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    )
                );
            }

            dispatch({ type: SET_ORDERS, orders: loadedOrders });
        } catch (err) {
            throw err;
        }
    }
};

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const date = new Date();
        const response = await fetch('https://rn-shopping-app-db087-default-rtdb.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        const resData = await response.json();

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        dispatch(
            { 
                type: ADD_ORDER, 
                orderData: 
                    { 
                        id: resData.name, 
                        items: cartItems, 
                        amount: totalAmount, 
                        date: date 
                    }
            }
        );
    };
};
