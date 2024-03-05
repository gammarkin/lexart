import {useState} from 'react';
import {TextInput, PasswordInput, Alert} from '@mantine/core';
import {useNavigate} from 'react-router-dom';

import api from '../utils/apiConfig';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [alert, setAlert] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (checkErrors()) {
			return null;
		}

		const response = await api.post('/api/login', {
			email,
			password,
		});

		if (response.status === 200) {
			localStorage.setItem('token', response.data.token);
			setAlert('Login successful!');

			cleanAlert();
			return navigate('/products', {
				state: {
					message: response.data.created
						? 'User created!'
						: 'Login successful!',
				},
			});
		}

		if (response.status === 401) {
			cleanAlert();
			return setAlert('Invalid email or password!');
		}

		cleanAlert();
		return setAlert('Login failed!');
	};

	const checkErrors = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email || !password) {
			cleanAlert();
			setAlert('Please fill in all fields!');

			return true;
		}

		if (email.length < 5 || password.length < 5) {
			cleanAlert();
			setAlert('Email and password must be at least 5 characters long!');

			return true;
		}

		if (!emailRegex.test(email)) {
			cleanAlert();
			setAlert('Invalid email!');

			return true;
		}

		return null;
	};

	const handleKeyEnter = (event) => {
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			handleSubmit();
		}
	};

	const cleanAlert = () => {
		setTimeout(() => {
			setAlert('');
		}, 3000);
	};

	return (
		<section className="vh-100 gradient-custom">
			{alert && (
				<Alert
					title={alert}
					color={alert === 'Login successful!' ? 'green' : 'red'}
				/>
			)}

			<div className="container py-5 h-100">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-11 col-md-8 col-xl-5 col-xl-5">
						<div
							className="card bg-dark text-white"
							style={{borderRadius: '1rem'}}
						>
							<div className="card-body p-5 text-center">
								<div className="mb-md-5 mt-md-4 pb-5">
									<h2 className="fw-bold mb-2 text-uppercase">Register</h2>
									<p className="text-white-50 mb-5">Welcome!</p>

									<TextInput
										placeholder="Email"
										className="m-3"
										value={email}
										onChange={(event) => setEmail(event.currentTarget.value)}
										onKeyDown={(e) => handleKeyEnter(e)}
									/>

									<PasswordInput
										placeholder="Password"
										className="m-3"
										value={password}
										onChange={(event) => setPassword(event.currentTarget.value)}
										onKeyDown={(e) => handleKeyEnter(e)}
									/>

									<button
										className="btn btn-outline-light mt-5 btn-lg px-5"
										type="submit"
										onClick={handleSubmit}
									>
										Register
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
