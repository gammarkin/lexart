import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

function App() {
	const redirect = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			redirect('/products');
		}

		if (!token) {
			redirect('/login');
		}
	});

	return <div>Hey, you&apos;re not supposed to see this...</div>;
}

export default App;
