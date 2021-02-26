import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../../components/UI/CustomHeaderButton';

const EditProduct = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');


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
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Save' 
                    iconName={Platform.OS === 'android' ? 'md-checkmark': 'ios-checkmark'} 
                    onPress={() => {
                        // navData.navigation.navigate('EditProducts');
                    }}
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
