import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/product-actions';

const HomeScreen = ({ match }) => {
	const keyword = match.params.keyword;

	// if it does not have a page number, set it to 1
	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<>
			<Meta />
			<h2>our product</h2>
		{!keyword ? (
				<ProductCarousel />
				) : (
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}
			<div className="row text-justify">
      <div className="col-md-4">
	  <h2></h2>
        <img height="100px" weigth="200px" src="https://www.gadgetbytenepal.com/wp-content/uploads/2020/11/Best-Phones-Under-NPR-40000-in-Nepal-December-2020-Update.jpg"/>
      </div>
      <div className="col-md-4">
        <h2>Genuine product</h2>
        <img  height="100px" weigth="100px" src="https://images.macrumors.com/t/lyXyKBUO1MuKL_dsWO-YqgXNpYU=/1600x0/article-new/2018/12/appleproductlineup.jpg"/>
		</div>
      <div className="col-md-4">
      <h2></h2>
      <img  height="100px" weigth="100px" src="https://www.gadgetbytenepal.com/wp-content/uploads/2021/02/Best-Mobile-Phones-Under-NPR-20000-in-Nepal-2021-1-696x364.jpg"/>
      </div>
    </div>
	<h1>Latest Mobile</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
					/>
				</>
			)}
	


			<h2>Best Sell</h2>
			
				<>
					<Row>
						{products.map((product) => (
							<Col  key={product._id} xl={2}>
								<ProductCarousel product={product} style={{ color: 'black' }}/>
							</Col>
						))}
					</Row>
				</>


			
		</>
	);
};

export default HomeScreen;
