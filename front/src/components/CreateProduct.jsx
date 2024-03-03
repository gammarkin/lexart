/* eslint-disable react/prop-types */

import {TextInput, Button, Modal} from '@mantine/core';
import {useState} from 'react';

import axios from 'axios';

export default function CreateProduct({setOpened, opened, setAlert}) {
	const [productName, setProductName] = useState('');
	const [brand, setBrand] = useState('');
	const [color, setColor] = useState('');
	const [model, setModel] = useState('');
	const [price, setPrice] = useState('');

	const createProduct = async () => {
		const product = {
			name: productName,
			details: {
				brand,
				model,
				color,
			},
			price,
		};

		await axios.post('http://localhost:3001/api/products', product);
		setOpened(false);

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
			title="Create product"
			opened={opened}
			onClose={() => setOpened(false)}
		>
			<TextInput
				placeholder="Product name"
				style={{width: '25rem'}}
				onChange={(event) => setProductName(event.currentTarget.value)}
				className="mb-3"
			/>

			<TextInput
				placeholder="Brand"
				style={{width: '25rem'}}
				onChange={(event) => setBrand(event.currentTarget.value)}
				className="mb-3"
			/>

			<TextInput
				placeholder="Color"
				style={{width: '25rem'}}
				onChange={(event) => setColor(event.currentTarget.value)}
				className="mb-3"
			/>

			<TextInput
				placeholder="Model"
				style={{width: '25rem'}}
				onChange={(event) => setModel(event.currentTarget.value)}
				className="mb-3"
			/>

			<TextInput
				placeholder="Price"
				style={{width: '25rem'}}
				onChange={(event) => setPrice(event.currentTarget.value)}
				className="mb-3"
			/>

			<Button style={{width: '100%'}} onClick={createProduct}>
				Create
			</Button>
		</Modal>
	);
}
