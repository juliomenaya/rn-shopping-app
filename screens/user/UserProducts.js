import React from 'react';
import { FlatList, Platform, Button } from 'react-native';
import ProductItem from '../../components/shop/ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const UserProducts = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProducts', { productId: id })
    };

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem
                    image={itemData.item.imageUrl} 
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        editProductHandler(itemData.item.id);
                    }}
                >
                    <Button 
                        color={Colors.primary} 
                        title='Edit' 
                        onPress={() => {
                            editProductHandler(itemData.item.id);
                        }}
                    />
                    <Button
                        color={Colors.primary} 
                        title='Delete' 
                        onPress={() => {
                            dispatch(productsActions.deleteProduct(itemData.item.id))
                        }} 
                    />
                </ProductItem>
            )}
        />
    );
};

UserProducts.navigationOptions = navData => {
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
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Add' 
                    iconName={Platform.OS === 'android' ? 'md-create': 'ios-create'} 
                    onPress={() => {
                        navData.navigation.navigate('EditProducts');
                    }}
                />
            </HeaderButtons>
        )
    };

};

export default UserProducts;


