import {useState, useEffect} from 'react';
import {CopyButton, Button, ScrollArea} from '@mantine/core';

import api from '../utils/apiConfig';

export default function GetToken() {
	const [token, setToken] = useState('');

	useEffect(() => {
		const getToken = async () => {
			if (!localStorage.getItem('token') || token) {
				return;
			}

			const userToken = localStorage.getItem('token') || 'token';
			const response = await api.post('/api/get/token', {token: userToken});

			return setToken(response.data.token);
		};

		getToken();
	}, [token]);

	return (
		<div className="m-5">
			<p className="display-5 bold mt-5">
				this is your external auth token for the API:
			</p>

			<p className="lead bold">
				Acessing the API in a external application is pretty easy!
			</p>

			<p className="lead bold">
				Just make the requests to https://lexart-back.vercel.app/ext/ route{' '}
				endpoint while adding the following authorization header:
			</p>

			<div className="d-flex">
				<ScrollArea type="auto" style={{width: '50vw', height: '3rem'}}>
					<pre className="lead bold">{token}</pre>
				</ScrollArea>

				<CopyButton value={token}>
					{({copied, copy}) => (
						<Button
							className="mx-5"
							color={copied ? 'teal' : 'blue'}
							onClick={copy}
						>
							{copied ? 'Copied token' : 'Copy token'}
						</Button>
					)}
				</CopyButton>
			</div>

			<p className="lead bold mt-5">
				Example of a request using the token in a header request of a external
				application:
			</p>
			<pre className="lead bold mb-5">{`Headers: {authorization: token}`}</pre>

			<p className="lead bold">Routes:</p>

			<pre className="lead bold m-2">get {`/ext/products`}</pre>
			<pre className="lead bold m-2">get {`/ext/products/:id`}</pre>
			<pre className="lead bold m-2">post {`/ext/products`}</pre>
		</div>
	);
}
