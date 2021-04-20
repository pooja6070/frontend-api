import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './display/HomeScreen';
import ProductScreen from './display/ProductScreen';
import CartScreen from './display/CartScreen';
import LoginScreen from './display/LoginScreen';
import RegisterScreen from './display/RegisterScreen';
import ProfileScreen from './display/ProfileScreen';
import ShippingScreen from './display/ShippingScreen';
import PaymentScreen from './display/PaymentScreen';
import PlaceOrderScreen from './display/PlaceOrderScreen';
import OrderScreen from './display/OrderScreen';
import UserListScreen from './display/UserListScreen';
import UserEditScreen from './display/UserEditScreen';
import ProductListScreen from './display/ProductListScreen';
import ProductEditScreen from './display/ProductEditScreen';
import OrderListScreen from './display/OrderListScreen';
import FavoritesScreen from './display/FavoritesScreen';

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/order/:id' component={OrderScreen} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/placeorder' component={PlaceOrderScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/profile' component={ProfileScreen} />
					<Route path='/favorites' component={FavoritesScreen} />
					<Route path='/product/:id' component={ProductScreen} />
					<Route path='/cart/:id?' component={CartScreen} />
					<Route path='/admin/userlist' component={UserListScreen} />
					<Route path='/admin/user/:id/edit' component={UserEditScreen} />
					<Route
						path='/admin/productlist'
						component={ProductListScreen}
						exact
					/>
					<Route
						path='/admin/productlist/:pageNumber'
						component={ProductListScreen}
						exact
					/>
					<Route path='/admin/product/:id/edit' component={ProductEditScreen} />
					<Route path='/admin/orderlist' component={OrderListScreen} />
					<Route path='/search/:keyword' component={HomeScreen} exact />
					<Route path='/page/:pageNumber' component={HomeScreen} exact />
					<Route
						path='/search/:keyword/page/:pageNumber'
						component={HomeScreen}
						exact
					/>
					<Route path='/' component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
