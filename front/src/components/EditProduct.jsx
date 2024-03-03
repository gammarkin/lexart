/* eslint-disable react/prop-types */

import {TextInput, Button, Modal} from '@mantine/core';
import {useState, useEffect} from 'react';

import axios from 'axios';

export default function EditProduct({setOpened, opened, setAlert}) {
	const [productName, setProductName] = useState('');
	const [brand, setBrand] = useState('');
	const [color, setColor] = useState('');
	const [model, setModel] = useState('');
	const [price, setPrice] = useState('');

	useEffect(() => {
		if (opened.details.brand) {
			setProductName(opened.name);
			setBrand(opened.details.brand);
			setColor(opened.details.color);
			setModel(opened.details.model);
			setPrice(opened.price);
		}
	}, [opened]);

	const editProduct = async () => {
		const product = {
			name: productName,
			details: {
				brand,
				model,
				color,
			},
			price,
		};

		await axios.put(
			`http://localhost:3001/api/products/${product.id}`,
			product
		);
		setOpened({details: {}});

		setProductName('');
		setBrand('');
		setColor('');
		setModel('');
		setPrice('');

		setAlert('Product created!');
		return setTimeout(() => setAlert(''), 3000);
	};

	return (
		<Modal
			title="Edit product"
			opened={opened.name}
			onClose={() => setOpened({details: {}})}
		>
			<TextInput
				label="Product name"
				placeholder="Product name"
				style={{width: '25rem'}}
				onChange={(event) => setProductName(event.currentTarget.value)}
				className="mb-3"
				value={productName}
				withAsterisk
			/>

			<TextInput
				label="Brand"
				placeholder="Brand"
				style={{width: '25rem'}}
				onChange={(event) => setBrand(event.currentTarget.value)}
				className="mb-3"
				value={brand}
				withAsterisk
			/>

			<TextInput
				label="Color"
				placeholder="Color"
				style={{width: '25rem'}}
				onChange={(event) => setColor(event.currentTarget.value)}
				className="mb-3"
				value={color}
				withAsterisk
			/>

			<TextInput
				label="Model"
				placeholder="Model"
				style={{width: '25rem'}}
				onChange={(event) => setModel(event.currentTarget.value)}
				className="mb-3"
				value={model}
				withAsterisk
			/>

			<TextInput
				label="Price"
				withAsterisk
				placeholder="Price"
				style={{width: '25rem'}}
				onChange={(event) => setPrice(event.currentTarget.value)}
				className="mb-3"
				value={price}
			/>

			<Button style={{width: '100%'}} onClick={editProduct}>
				Edit
			</Button>
		</Modal>
	);
}