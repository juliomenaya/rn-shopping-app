import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductsOverview = props => {
    const products = useSelector(state => state.products.availableProducts);

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
                        onViewDetail={() => {}} 
                        onAddToCart={() => {}} 
                    />
                )
            }} 
        />
    );
};

ProductsOverview.navigationOptions = {
    headerTitle: 'All products'
}

export default ProductsOverview;

const styles = StyleSheet.create({

});
