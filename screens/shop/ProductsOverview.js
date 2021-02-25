import React from 'react';
import { StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const ProductsOverview = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch()

    return (
        <FlatList 
            data={products} 
            keyExtractor={item => item.id} 
            renderItem={itemData => {
                return (
                    <ProductItem 
                        image={itemData.item.imageUrl} 
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onViewDetail={() => {
                            props.navigation.navigate('ProductDetail', { productId: itemData.item.id, productTitle:  itemData.item.title });
                        }} 
                        onAddToCart={() => {
                            dispatch(cartActions.addToCart(itemData.item));
                        }} 
                    />
                )
            }} 
        />
    );
};

ProductsOverview.navigationOptions = navData => {
    return {
        headerTitle: 'All products',
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
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='cart' 
                    iconName={Platform.OS === 'android' ? 'md-cart': 'ios-cart'} 
                    onPress={() => {
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
        )
    }
}

export default ProductsOverview;

const styles = StyleSheet.create({

});
