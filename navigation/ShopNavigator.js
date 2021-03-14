import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Button, Platform, SafeAreaView, View } from 'react-native';
import ProductsOverview, { screenOptions as productsOverviewOptions } from '../screens/shop/ProductsOverview';
import ProductDetail, { screenOptions as productDetailScreenOptions } from '../screens/shop/ProductDetail';
import Orders, { screenOptions as ordersOptions } from '../screens/shop/Orders';
import Cart, { screenOptions as cartOptions } from '../screens/shop/Cart';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import UserProducts, { screenOptions as userProductsOptions } from '../screens/user/UserProducts';
import EditProduct, { screenOptions as editProductOptions } from '../screens/user/EditProduct';
import AuthScreen, { screenOptions as authOptions } from '../screens/user/AuthScreen';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

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

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions={defaultOptions} >
            <ProductsStackNavigator.Screen
                name='ProductsOverview'
                component={ProductsOverview}
                options={productsOverviewOptions}
            />
            <ProductsStackNavigator.Screen
                name='ProductDetail'
                component={ProductDetail}
                options={productDetailScreenOptions}
            />
            <ProductsStackNavigator.Screen
                name='Cart'
                component={Cart}
                options={cartOptions}
            />
        </ProductsStackNavigator.Navigator>
    );
};


const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions={defaultOptions}>
            <OrdersStackNavigator.Screen
                name='Orders'
                component={Orders}
                options={ordersOptions}
            />
        </OrdersStackNavigator.Navigator>
    );
};


const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultOptions}>
            <AdminStackNavigator.Screen
                name='UserProducts'
                component={UserProducts}
                options={userProductsOptions}
            />
            <AdminStackNavigator.Screen
                name='EditProducts'
                component={EditProduct}
                options={editProductOptions}
            />
        </AdminStackNavigator.Navigator>
    );
};


const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={
                props => {
                    return (
                        <View style={{flex: 1, paddingTop: 20}}>
                            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                                <DrawerItemList {...props} />
                                <Button title='Logout' color={Colors.primary} onPress={() => {
                                        dispatch(authActions.logout());
                                    }} 
                                />
                            </SafeAreaView>
                        </View>
                    );
                }
            }
            drawerContentOptions={{activeTintColor: Colors.primary}}>
            <ShopDrawerNavigator.Screen
                name='Products'
                component={ProductsNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-cart': 'ios-cart'}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen
                name='Orders'
                component={OrdersNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'md-list': 'ios-list'}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
            <ShopDrawerNavigator.Screen
                name='Admin'
                component={AdminNavigator}
                options={{
                    drawerIcon: props => (
                        <Ionicons 
                            name={Platform.OS === 'android' ? 'person-outline': 'ios-user'}
                            size={23}
                            color={props.color}
                        />
                    )
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
};


const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions={defaultOptions}>
            <AuthStackNavigator.Screen name='Auth' component={AuthScreen} options={authOptions}/>
        </AuthStackNavigator.Navigator>
    );
};
