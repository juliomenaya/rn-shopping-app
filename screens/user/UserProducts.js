import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';

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
                    onSelect={() => {}}
                >
                    <Button 
                        color={Colors.primary} 
                        title='Edit' 
                        onPress={() => {
                            
                        }}
                    />
                    <Button
                        color={Colors.primary} 
                        title='Delete' 
                        onPress={() => {
                            
                        }} 
                    />
                </ProductItem>
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


