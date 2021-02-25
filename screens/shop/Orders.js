import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const Orders = props => {
    const orders = useSelector(state => state.orders.orders)
    return (
        <FlatList 
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemDAta => <Text>{itemDAta.item.totalAmount}</Text>}
        />
    );
};

Orders.navigationOptions = navData => {
    return {
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-menu': 'ios-menu'} 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerTitle: 'Your Orders'
    };
};

export default Orders;
