import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {TextInput, Alert, Button, Loader} from '@mantine/core';

import CreateProduct from '../components/CreateProduct.jsx';
import EditProduct from '../components/EditProduct.jsx';

import axios from 'axios';

export default function Products() {
	const [alert, setAlert] = useState('');
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const [opened, setOpened] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editProduct, openEditProduct] = useState({details: {}});

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		let once = false;
		if (location.state && once) {
			setAlert(location.state.message);
			once = true;

			setTimeout(() => {
				setAlert('');
			}, 3000);
		}

		const isTokenValid = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				return navigate('/login');
			}

			const response = await axios
				.post('http://localhost:3001/api/check/token', {token})
				.catch(() => {
					return navigate('/login');
				});

			if (response.status !== 200) {
				return navigate('/login');
			}
		};

		isTokenValid();
	}, [location, navigate]);

	useEffect(() => {
		let once = false;

		if (alert || !once) {
			setLoading(true);

			axios.get('http://localhost:3001/api/products').then((response) => {
				setFilteredProducts(response.data.products);
				setProducts(response.data.products);
			});

			once = true;
			setLoading(false);
		}
	}, [alert, setAlert]);

	const handleSearchProducts = async (query) => {
		if (!query) {
			return setFilteredProducts(products);
		}

		return setFilteredProducts(
			products.filter((product) =>
				product.name.toLowerCase().includes(query.toLowerCase())
			)
		);
	};

	const deleteProduct = async (product) => {
		setLoading(true);
		await axios.delete(`http://localhost:3001/api/products/${product.id}`);

		setLoading(false);
		setAlert('Product deleted!');
		return setTimeout(() => setAlert(''), 3000);
	};

	if (loading) {
		return (
			<div
				style={{height: '100vh'}}
				className="d-flex justify-content-center align-items-center"
			>
				<Loader color="dark" />
			</div>
		);
	}

	return (
		<div>
			{alert && <Alert title={alert} color="blue" />}

			<CreateProduct
				setOpened={setOpened}
				setAlert={setAlert}
				opened={opened}
				setLoading={setLoading}
			/>
			<EditProduct
				setOpened={openEditProduct}
				setAlert={setAlert}
				opened={editProduct}
				setLoading={setLoading}
			/>

			<div className="d-flex justify-content-between m-3">
				<TextInput
					placeholder="Search for a product name"
					style={{width: '25rem'}}
					onChange={(event) => handleSearchProducts(event.currentTarget.value)}
				/>

				<Button onClick={() => setOpened(true)}>+ Add Product</Button>
			</div>

			<table
				style={{width: '100vw'}}
				className="table table-hover table-responsive-md"
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Brand</th>
						<th>Model</th>
						<th>Price</th>
						<th>Color</th>
						<th>options</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(products) &&
						filteredProducts.map((product) => (
							<tr key={product.id}>
								<td>{product.name}</td>
								<td>{product.details.brand}</td>
								<td>{product.details.model}</td>
								<td>{product.price}</td>
								<td>{product.details.color}</td>
								<td>
									<Button
										onClick={() => openEditProduct(product)}
										color="yellow"
										className="m-1"
									>
										Edit
									</Button>

									<Button onClick={() => deleteProduct(product)} color="red">
										delete
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
