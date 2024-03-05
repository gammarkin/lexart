/* eslint-disable react/prop-types */

import {TextInput, Button, NumberInput, Modal} from '@mantine/core';
import {useState} from 'react';

import api from '../utils/apiConfig';

export default function CreateProduct({
	setOpened,
	opened,
	setAlert,
	setLoading,
}) {
	const [productName, setProductName] = useState('');
	const [brand, setBrand] = useState('');
	const [color, setColor] = useState('');
	const [model, setModel] = useState('');
	const [price, setPrice] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const createProduct = async () => {
		if (!productName || !brand || !color || !model || !price) {
			return setSubmitted(true);
		}

		const product = {
			name: productName,
			details: {
				brand,
				model,
				color,
			},
			price,
		};

		await api.post('/api/products', product);
		setLoading(true);
		setOpened(false);
		setSubmitted(false);

		setProductName('');
		setBrand('');
		setColor('');
		setModel('');
		setPrice('');

		setLoading(false);
		setAlert('Product created!');
		return setTimeout(() => setAlert(''), 3000);
	};

	return (
		<Modal
			title="Create product"
			opened={opened}
			onClose={() => {
				setOpened(false);
				setSubmitted(false);
			}}
		>
			<TextInput
				placeholder="Product name"
				style={{width: '25rem'}}
				onChange={(event) => setProductName(event.currentTarget.value)}
				className="mb-3"
				error={
					!productName && opened && submitted && 'Product name is required'
				}
			/>

			<TextInput
				placeholder="Brand"
				style={{width: '25rem'}}
				onChange={(event) => setBrand(event.currentTarget.value)}
				className="mb-3"
				error={!brand && opened && submitted && 'Brand is required'}
			/>

			<TextInput
				placeholder="Color"
				style={{width: '25rem'}}
				onChange={(event) => setColor(event.currentTarget.value)}
				className="mb-3"
				error={!color && opened && submitted && 'Color is required'}
			/>

			<TextInput
				placeholder="Model"
				style={{width: '25rem'}}
				onChange={(event) => setModel(event.currentTarget.value)}
				className="mb-3"
				error={!model && opened && submitted && 'Model is required'}
			/>

			<NumberInput
				error={!price && opened && submitted && 'Price is required'}
				label="Price"
				withAsterisk
				placeholder="Price"
				style={{width: '25rem'}}
				onChange={(val) => setPrice(val)}
				className="mb-3"
				value={price}
				parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
				formatter={(value) =>
					!Number.isNaN(parseFloat(value))
						? `$ ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
						: '$ '
				}
			/>

			<Button style={{width: '100%'}} onClick={createProduct}>
				Create
			</Button>
		</Modal>
	);
}
