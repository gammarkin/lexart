const formatProduct = (product = {}) => {
    if (product.details) {
        return product;
    }

    if (Array.isArray(product)) {
        return product.flatMap(prod => prod.data.map(productData => ({
            name: prod.name,
            details: {
                brand: prod.brand,
                model: prod.model,
                color: productData.color
            },
            price: productData.price
        })));
    }

    return {
        name: product.name,
        details: {
            brand: product.brand,
            model: product.model,
            color: product.color
        },
        price: product.price
    };
}



export default formatProduct;