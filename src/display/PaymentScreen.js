import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Meta from '../components/Meta';
import { savePaymentMethod } from '../actions/cart-actions';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('esewa');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<Meta title='Payment' />
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='esewa'
							id='esewa'
							name='paymentMethod'
							value='esewa'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
						
					</Col>
				</Form.Group>
				<img src='https://techlekh.com/wp-content/uploads/2017/06/esewa-logo.png'
				height='100px'
				/>
				<Button type='submit' variant='primary' color='green'
				style={{ color: 'green' }}
				>
				Pay by eSewa
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
