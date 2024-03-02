import React from 'react';
import ReactDOM from 'react-dom/client';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import App from './App.jsx';

import Login from './pages/Login.jsx';
import Products from './pages/Products.jsx';
import GetToken from './pages/GetToken.jsx';
import NotFound from './pages/NotFound.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/products',
		element: <Products />,
	},
	{
		path: '/get-token',
		element: <GetToken />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
