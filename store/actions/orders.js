
export const ADD_ORDER = 'ADD_ORDER';

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
