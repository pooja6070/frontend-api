import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import {
	getOrderDetails,
	payOrder,
} from '../actions/order-actions';
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from '../constants/order-constants';
import CheckoutForm from '../components/CheckoutForm';


const OrderScreen = ({ match, history }) => {
	const orderId = match.params.id;

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	const orderDeliver = useSelector((state) => state.orderDeliver);
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

	if (!loading) {
		const addDecimals = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2);
		};
		order.itemsPrice = addDecimals(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		);
	}

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		}

		if (successPay || !order || order._id !== orderId || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET }); 
			dispatch({ type: ORDER_DELIVER_RESET });
			dispatch(getOrderDetails(orderId));
		}
	}, [dispatch, order, orderId, successPay, successDeliver]);

	// call pay order
	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(orderId, paymentResult));
	};


	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<Meta title='Order Details' />
			<h1>Order {orderId}</h1>
			<Row>
				<Col md={7}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>verify Location</h2>
							<p>
								<strong>Name: </strong> {order.user.name}
							</p>
							<p>
								<strong>Email: </strong>{' '}
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
								{order.shippingAddress.PhoneNo},{' '}
								{order.shippingAddress.country}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>
								{order.paymentMethod}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{order.orderItems.length === 0 ? (
								<Message>Order is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x Rs.{item.price} = Rs.
													{Number(item.qty * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={5}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>Rs.{order.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>Rs.{order.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>Rs.{order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!order.isPaid && (
								<ListGroup.Item>
									{loadingPay && <Loader />}
					
										<CheckoutForm
											totalPrice={order.totalPrice}
											paymentHandler={successPaymentHandler}
										/>
								</ListGroup.Item>
							)}
							{loadingDeliver && <Loader />}
							{userInfo &&
								userInfo.isAdmin &&
								order.isPaid &&
								!order.isDelivered}
						</ListGroup>
						<Button>
							Print
						</Button>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default OrderScreen;
