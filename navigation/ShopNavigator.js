import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import ProductsOverview from '../screens/shop/ProductsOverview';
import ProductDetail from '../screens/shop/ProductDetail';
import Cart from '../screens/shop/Cart';
import Colors from '../constants/Colors';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverview,
    ProductDetail: ProductDetail,
    Cart: Cart
}, {
    defaultNavigationOptions: {
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
});

export default createAppContainer(ProductsNavigator);