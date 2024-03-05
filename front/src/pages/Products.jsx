import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {TextInput, Alert, Button, Loader, Select} from '@mantine/core';

import CreateProduct from '../components/CreateProduct.jsx';
import EditProduct from '../components/EditProduct.jsx';

import api from '../utils/apiConfig.js';

import Down from '../assets/down.png';

export default function Products() {
	const [alert, setAlert] = useState('');
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchName, setSearchName] = useState('name');

	const [opened, setOpened] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editProduct, openEditProduct] = useState({details: {}});

	const [sortOrder, setSortOrder] = useState({
		name: 'asc',
		brand: 'asc',
		model: 'asc',
		price: 'asc',
		color: 'asc',
	});

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

			const response = await api.post('/api/check/token', {token}).catch(() => {
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

			api.get('/api/products').then((response) => {
				setFilteredProducts(response.data.products);
				setProducts(response.data.products);
			});

			once = true;
			setLoading(false);
		}
	}, [alert, setAlert]);

	const toggleSortOrder = (column) => {
		setSortOrder((prevSortOrder) => ({
			...prevSortOrder,
			[column]: prevSortOrder[column] === 'asc' ? 'desc' : 'asc',
		}));
	};

	const sortProducts = (column) => {
		if (column === 'price') {
			setFilteredProducts((prevProducts) =>
				[...prevProducts].sort((a, b) => {
					const valueA = a[column];
					const valueB = b[column];
					const sortOrderMultiplier = sortOrder[column] === 'asc' ? 1 : -1;

					return sortOrderMultiplier * (valueA - valueB);
				})
			);

			return toggleSortOrder(column);
		}

		if (column.includes('details')) {
			const nestedColumn = column.split('.')[1];
			const sortOrderMultiplier = sortOrder[nestedColumn] === 'asc' ? 1 : -1;

			setFilteredProducts((prevProducts) =>
				[...prevProducts].sort(
					(a, b) =>
						sortOrderMultiplier *
						a.details[nestedColumn].localeCompare(b.details[nestedColumn])
				)
			);

			return toggleSortOrder(nestedColumn);
		}

		setFilteredProducts((prevProducts) =>
			[...prevProducts].sort((a, b) => {
				const sortOrderMultiplier = sortOrder[column] === 'asc' ? 1 : -1;

				return sortOrderMultiplier * a[column].localeCompare(b[column]);
			})
		);

		return toggleSortOrder(column);
	};

	const handleSearchProducts = async (query) => {
		if (!query) {
			return setFilteredProducts(products);
		}

		if (searchName === 'price') {
			return setFilteredProducts(
				products.filter((product) =>
					String(product[searchName]).includes(query)
				)
			);
		}

		if (searchName.includes('.')) {
			const nestedColumn = searchName.split('.')[1];

			return setFilteredProducts(
				products.filter((product) =>
					product.details[nestedColumn]
						.toLowerCase()
						.includes(query.toLowerCase())
				)
			);
		}

		return setFilteredProducts(
			products.filter((product) =>
				product[searchName].toLowerCase().includes(query.toLowerCase())
			)
		);
	};

	const deleteProduct = async (product) => {
		setLoading(true);
		await api.delete(`/api/products/${product.id}`);

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
				<div className="d-flex">
					<TextInput
						placeholder={`Search for a product ${
							searchName.includes('.')
								? `by ${searchName.split('.')[1]}`
								: `by ${searchName}`
						}`}
						style={{width: '25rem'}}
						onChange={(event) =>
							handleSearchProducts(event.currentTarget.value)
						}
					/>

					<Select
						style={{width: '7rem'}}
						data={[
							{label: 'Name', value: 'name'},
							{label: 'Brand', value: 'details.brand'},
							{label: 'Model', value: 'details.model'},
							{label: 'Price', value: 'price'},
							{label: 'Color', value: 'details.color'},
						]}
						value={searchName}
						onChange={setSearchName}
						placeholder="Search by"
						className="mx-1"
					/>
				</div>

				<div>
					<Button className="m-1" onClick={() => setOpened(true)}>
						+ Add Product
					</Button>
					<Button className="m-1" onClick={() => navigate('/get-token')}>
						Use external API
					</Button>
				</div>
			</div>

			<table
				style={{width: '100vw'}}
				className="table table-hover table-responsive-md"
			>
				<thead>
					<tr>
						<th onClick={() => sortProducts('name')}>
							Name <img style={{width: '1rem'}} src={Down} />
						</th>
						<th onClick={() => sortProducts('details.brand')}>
							Brand <img style={{width: '1rem'}} src={Down} />
						</th>
						<th onClick={() => sortProducts('details.model')}>
							Model <img style={{width: '1rem'}} src={Down} />
						</th>
						<th onClick={() => sortProducts('price')}>
							Price <img style={{width: '1rem'}} src={Down} />
						</th>
						<th onClick={() => sortProducts('details.color')}>
							Color <img style={{width: '1rem'}} src={Down} />
						</th>
						<th>
							options <img style={{width: '1rem'}} src={Down} />
						</th>
					</tr>
				</thead>
				<tbody>
					{Array.isArray(filteredProducts) &&
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
