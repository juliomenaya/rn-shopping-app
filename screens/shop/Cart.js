import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';

const Cart = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transfomredCartItems = [];
        for (const key in state.cart.items) {
            transfomredCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transfomredCartItems;
    });

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text></Text>
                <Button color={Colors.accent} title="Order Now" disabled={cartItems.length === 0} />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => {
                    return (
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum} 
                            onRemove={() => {}}
                        />
                    )
                }}
            />
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    scrren: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});
