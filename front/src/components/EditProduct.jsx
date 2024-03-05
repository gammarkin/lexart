/* eslint-disable react/prop-types */

import {TextInput, NumberInput, Button, Modal} from '@mantine/core';
import {useState, useEffect} from 'react';

import api from '../utils/apiConfig';

export default function EditProduct({setOpened, opened, setAlert, setLoading}) {
	const [productName, setProductName] = useState('');
	const [brand, setBrand] = useState('');
	const [color, setColor] = useState('');
	const [model, setModel] = useState('');
	const [price, setPrice] = useState('');
	const [id, setId] = useState('');
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		if (opened.details.brand) {
			setProductName(opened.name);
			setBrand(opened.details.brand);
			setColor(opened.details.color);
			setModel(opened.details.model);
			setPrice(opened.price);
			setId(opened.id);
		}
	}, [opened]);

	const editProduct = async () => {
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
			id,
		};

		if (product === opened) {
			setSubmitted(false);
			return setOpened({details: {}});
		}

		setLoading(true);

		await api.put(`/api/products/${product.id}`, product);
		setOpened({details: {}});
		setSubmitted(false);

		setProductName('');
		setBrand('');
		setColor('');
		setModel('');
		setPrice('');
		setId('');
		setLoading(false);

		setAlert('Product Edited!');
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
				error={
					!productName && opened && submitted && 'Product name is required'
				}
			/>

			<TextInput
				label="Brand"
				placeholder="Brand"
				style={{width: '25rem'}}
				onChange={(event) => setBrand(event.currentTarget.value)}
				className="mb-3"
				value={brand}
				withAsterisk
				error={!brand && opened && submitted && 'Brand is required'}
			/>

			<TextInput
				label="Color"
				placeholder="Color"
				style={{width: '25rem'}}
				onChange={(event) => setColor(event.currentTarget.value)}
				className="mb-3"
				value={color}
				withAsterisk
				error={!color && opened && submitted && 'Color is required'}
			/>

			<TextInput
				label="Model"
				placeholder="Model"
				style={{width: '25rem'}}
				onChange={(event) => setModel(event.currentTarget.value)}
				className="mb-3"
				value={model}
				withAsterisk
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

			<Button style={{width: '100%'}} onClick={editProduct}>
				Edit
			</Button>
		</Modal>
	);
}
