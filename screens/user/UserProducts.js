import React from 'react';
import { FlatList, Platform } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const UserProducts = () => {
    const userProducts = useSelector(state => state.products.userProducts);
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onViewDetails={() => {}}
                    onAddToCart={() => {}}
                />
            )}
        />
    );
};

UserProducts.navigationOpntions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu' 
                    iconName={Platform.OS === 'android' ? 'md-admin': 'ios-menu'} 
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };

};

export default UserProducts;


