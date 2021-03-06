import React, { useReducer, useCallback, useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, ScrollView, KeyboardAvoidingView, Button, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer,
        {
            inputValues: {
                email: '',
                password: ''
            },
            inputValidities: {
                email: false,
                password: false
            },
            formIsValid: false
        }
    );

    useEffect(() => {
        if (error) {
            Alert.alert('An error occurred', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signup(formState.inputValues.email, formState.inputValues.password);
        } else {
            action = authActions.login(formState.inputValues.email, formState.inputValues.password);
        }
        setIsLoading(true);
        setError(null);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({ 
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier 
        });

    }, [dispatchFormState]);
    
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={50} style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-Mail'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            errorText='Please enter a valid email address'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={8}
                            autoCapitalize='none'
                            errorText='Please enter a valid password'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? (
                                <ActivityIndicator
                                    size='large'
                                    color={Colors.primary}
                                />
                            ) : (
                                <Button
                                    title={isSignUp ? 'Sign Up' : 'Login'}
                                    color={Colors.primary}
                                    onPress={authHandler}
                                />)
                            }
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`} 
                                color={Colors.accent} 
                                onPress={() => {
                                    setIsSignUp(prevState => !prevState)
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        // height: '50%',
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10,
    }
});

export default AuthScreen;
