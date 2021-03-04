import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import ProductsOverview from '../screens/shop/ProductsOverview';
import ProductDetail from '../screens/shop/ProductDetail';
import Orders from '../screens/shop/Orders';
import Cart from '../screens/shop/Cart';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import UserProducts from '../screens/user/UserProducts';
import EditProduct from '../screens/user/EditProduct';
import AuthScreen from '../screens/user/AuthScreen';


const defaultOptions = { 
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary

}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverview,
    ProductDetail: ProductDetail,
    Cart: Cart
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-cart': 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}
            />
        )
    },
    defaultNavigationOptions: defaultOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: Orders
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'md-list': 'ios-list'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    },
    defaultNavigationOptions: defaultOptions
});

const AdminNavigator = createStackNavigator({
    UserProducts: UserProducts,
    EditProducts: EditProduct
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => {
            return (
                <Ionicons 
                    name={Platform.OS === 'android' ? 'person-outline': 'ios-user'}
                    size={23}
                    color={drawerConfig.tintColor}
                />
            )
        }
    },
    defaultNavigationOptions: defaultOptions
})

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultOptions
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
