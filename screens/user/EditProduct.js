import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';

const EditProduct = (props) => {
    return (
        <ScrollView>
            <View style={styles.form}>            
                <View style={styles.formCrontrol}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={StyleSheet.input} />
                </View>
                <View style={styles.formCrontrol}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={StyleSheet.input} />
                </View>
                <View style={styles.formCrontrol}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={StyleSheet.input} />
                </View>
                <View style={styles.formCrontrol}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={StyleSheet.input} />
                </View>
            </View>
        </ScrollView>
    );
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
