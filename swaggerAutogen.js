"use strict"

const URL = "https://stock-api-drab.vercel.app"

/* ------------------------------------------------------- */
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = {
	info: {
		version: packageJson.version,
		title: packageJson.title,
		description: packageJson.description,
		termsOfService: "https://furkandogu.vercel.app",
		contact: { name: packageJson.author, email: "furkandogu2018@gmail.com" },
		license: { name: packageJson.license, },
	},
	host: `${URL}`,
	basePath: '/',
	schemes: ['http', 'https'],
	consumes: ["application/json"],
	produces: ["application/json"],
	securityDefinitions: {
		Token: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'Simple Token Authentication * Example: <b>Token ...tokenKey...</b>'
		},
		Bearer: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'JWT Authentication * Example: <b>Bearer ...accessToken...</b>'
		},
	},
	security: [{ Token: [] }, { Bearer: [] }],
	definitions: {
		// Models:
		"User": require('./src/models/user').schema.obj,
		"Brand": require('./src/models/brand').schema.obj,
		"Category": require('./src/models/category').schema.obj,
		"Firm": require('./src/models/firm').schema.obj,
		"Product": require('./src/models/product').schema.obj,
		"Purchase": require('./src/models/purchase').schema.obj,
		"Sale": require('./src/models/sale').schema.obj,
	}
}

const routes = ['./index.js']
const outputFile = './src/configs/swagger.json'

// Create JSON file:
swaggerAutogen(outputFile, routes, document)