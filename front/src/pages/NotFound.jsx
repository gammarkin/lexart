import {useNavigate} from 'react-router-dom';

export default function NotFound() {
	const navigate = useNavigate();

	setTimeout(() => {
		navigate('/');
	}, 1000);

	return (
		<div
			style={{height: '100vh'}}
			className="d-flex flex-column justify-content-center align-items-center"
		>
			<p className="display-1 bold">404</p>

			<p>Not Found</p>
		</div>
	);
}
