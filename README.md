# LexShop

[EN](#lexshop) [PT](#visão-geral-do-projeto)

## Project Overview

This project involves the development of a web application to manage products (cellphones) using Node.js for the backend and React for the frontend. The backend should provide external services that allow clients to consume the list of products and insert new ones.

## Features

1. Login and registration.
2. Main page displaying all available products and their details, accessible only with user login.
3. Ability to add new products.
4. Ability to edit existing products.
5. Ability to delete products.
6. Add search and filtering functionalities for products.
7. List products from external APIs.

## External API Structures

### Structure 1

```json
{
	"name": "Xiaomi Redmi 9",
	"brand": "Xiaomi",
	"model": "Redmi 9",
	"price": 10000,
	"color": "red"
}
```

### Structure 2

```json
{
	"name": "Xiaomi Redmi 9",
	"details": {
		"brand": "Xiaomi",
		"model": "Redmi 9",
		"color": "red"
	},
	"price": 10000
}
```

### Structure 3

```json
[
	{
		"name": "Xiaomi Redmi 9",
		"brand": "Xiaomi",
		"model": "Redmi 9",
		"data": [
			{
				"price": 10000,
				"color": "red"
			},
			{
				"price": 10000,
				"color": "blue"
			}
		]
	},
	{
		"name": "Iphone 14 Pro",
		"brand": "Iphone",
		"model": "14 Pro",
		"data": [
			{
				"price": 30000,
				"color": "silver"
			},
			{
				"price": 30100,
				"color": "gold"
			}
		]
	}
]
```

## Acessing the external API:

You can make the requests to https://lexart-back.vercel.app/ext/products route endpoint while adding the following authorization header:

```yml
Headers: {authorization: token}
```

### Getting the token

Just make your account, and acess https://lexart-lilac.vercel.app/get-token to get your token on the site.

## Routes:

get /ext/products

get /ext/products/:id

post /ext/products

## Visão Geral do Projeto

Este projeto envolve o desenvolvimento de uma aplicação web para gerenciar produtos (celulares) usando Node.js para o backend e React para o frontend. O backend deve fornecer serviços externos que permitam aos clientes consumir a lista de produtos e inserir novos.

## Recursos

1. Login e registro.
2. Página principal exibindo todos os produtos disponíveis e seus detalhes, acessível apenas com o login do usuário.
3. Capacidade de adicionar novos produtos.
4. Capacidade de editar produtos existentes.
5. Capacidade de excluir produtos.
6. Adicionar funcionalidades de pesquisa e filtragem de produtos.
7. Listar produtos de APIs externas.

## Estruturas de API Externa

### Estrutura 1

```json
{
	"name": "Xiaomi Redmi 9",
	"brand": "Xiaomi",
	"model": "Redmi 9",
	"price": 10000,
	"color": "red"
}
```

### Estrutura 2

```json
{
	"name": "Xiaomi Redmi 9",
	"details": {
		"brand": "Xiaomi",
		"model": "Redmi 9",
		"color": "red"
	},
	"price": 10000
}
```

### Estrutura 3

```json
[
	{
		"name": "Xiaomi Redmi 9",
		"brand": "Xiaomi",
		"model": "Redmi 9",
		"data": [
			{
				"price": 10000,
				"color": "red"
			},
			{
				"price": 10000,
				"color": "blue"
			}
		]
	},
	{
		"name": "Iphone 14 Pro",
		"brand": "Iphone",
		"model": "14 Pro",
		"data": [
			{
				"price": 30000,
				"color": "silver"
			},
			{
				"price": 30100,
				"color": "gold"
			}
		]
	}
]
```

## Acessando a API Externa:

Você pode fazer as requisições para o endpoint https://lexart-back.vercel.app/ext/products enquanto adiciona o seguinte cabeçalho de autorização:

```yml
Headers: {authorization: token}
```

### Adquirindo o token de autorização:

Acesse o site https://lexart-lilac.vercel.app/get-token para pegar o seu token de acesso.

## Rotas:

get /ext/products

get /ext/products/:id

post /ext/products
