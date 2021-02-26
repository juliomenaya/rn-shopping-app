import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/products';

const EditProduct = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, title, description, imageUrl));
        } else {
            dispatch(productsActions.createProduct(title, description, imageUrl, +price));  // +(str) cast to number: '12' => 12
        }
    }, [dispatch, prodId, title, description, imageUrl, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])


    return (
        <ScrollView>
            <View style={styles.form}>            
                <View style={styles.formCrontrol}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={StyleSheet.input} onChangeText={text => setTitle(text)} value={title}/>
                </View>
                <View style={styles.formCrontrol}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={StyleSheet.input} onChangeText={imageUrl => setImageUrl(imageUrl)} value={imageUrl} />
                </View>
                {editedProduct ? null : (
                        <View style={styles.formCrontrol}>
                            <Text style={styles.label}>Price</Text>
                            <TextInput style={StyleSheet.input} onChangeText={price => setPrice(price)} value={price} />
                        </View>
                    )
                }
                <View style={styles.formCrontrol}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={StyleSheet.input} onChangeText={description => setDescription(description)} value={description}/>
                </View>
            </View>
        </ScrollView>
    );
};

EditProduct.navigationOptions = navData => {
    const submitFunc = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save' 
                    iconName={Platform.OS === 'android' ? 'md-checkmark': 'ios-checkmark'} 
                    onPress={submitFunc}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProduct;
