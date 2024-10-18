import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'api-mern-products-auth',
			version: '1.0.0',
			description: 'API documentation',
			contact: {
				name: 'Daiana de Paula',
				email: 'daianaadepaula1@gmail.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:3000',
			},
		],
	},
	apis: ['./backend/routes/*.js'],
};

export default swaggerJsDoc(swaggerOptions);
