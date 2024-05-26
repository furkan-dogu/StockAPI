# Stock API

This project is a RESTful API developed using Node.js and Express. The API interacts with a MongoDB database and is documented with Swagger. It supports CRUD operations for auth, user, category, brand, firm, product, purchase, and sale sections, and secures transactions with token and JWT.

## ERD

![ERD](./erd.png)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Documentation](#documentation)
- [Endpoints](#endpoints)
- [Project Skeleton](#project-skeleton)

## Live Demo

[Stock API](https://stock-api-drab.vercel.app/)

## Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, used for server-side scripting.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js, used to build the API.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model application data.
- **jsonwebtoken**: A library to implement JSON Web Tokens (JWT) for securing API endpoints through token-based authentication.
- **dotenv**: A module that loads environment variables from a .env file into process.env, allowing for configuration of environment-specific variables.
- **cors**: A middleware for Express to enable Cross-Origin Resource Sharing (CORS), allowing the API to handle requests from different origins.
- **express-async-errors**: A middleware to handle errors in async route handlers in Express.
- **swagger-ui-express**: A library to serve auto-generated Swagger API documentation via an Express route.
- **swagger-autogen**: A tool to automatically generate Swagger documentation based on JSDoc comments in your code.
- **redoc-express**: A library to serve the ReDoc documentation for your API.


## Documentation

- Swagger UI: [https://stock-api-drab.vercel.app/documents/swagger](https://stock-api-drab.vercel.app/documents/swagger)
- Redoc: [https://stock-api-drab.vercel.app/documents/redoc](https://stock-api-drab.vercel.app/documents/redoc)
- JSON Documentation: [https://stock-api-drab.vercel.app/documents/json](https://stock-api-drab.vercel.app/documents/json)

## Endpoints

### Users

- `GET /users`: Lists all users.
- `POST /users`: Creates a new user.
- `GET /users/:userId`: Displays a specific user.
- `PUT /users/:userId`: Updates information of a specific user.
- `DELETE /users/:userId`: Deletes a specific user.

### Authentication

- `POST /auth/login`: Provides user login.
- `POST /auth/refresh`: Refreshes the access token using a refresh token to maintain user session.
- `GET /auth/logout`: Terminates the user session.

### Categories

- `GET /categories`: Lists all blog categories.
- `POST /categories`: Creates a new blog category.
- `GET /categories/:categoryId`: Displays a specific blog category.
- `PUT /categories/:categoryId`: Updates information of a specific blog category.
- `DELETE /categories/:categoryId`: Deletes a specific blog category.

### Brands

- `GET /brands`: Lists all brands.
- `POST /brands`: Creates a new brand.
- `GET /brands/:brandId`: Displays a specific brand.
- `PUT /brands/:brandId`: Updates information of a specific brand.
- `DELETE /brands/:brandId`: Deletes a specific brand.

### Firms

- `GET /firms`: Lists all firms.
- `POST /firms`: Creates a new firm.
- `GET /firms/:firmId`: Displays a specific firm.
- `PUT /firms/:firmId`: Updates information of a specific firm.
- `DELETE /firms/:firmId`: Deletes a specific firm.

### Products

- `GET /products`: Lists all products.
- `POST /products`: Creates a new product.
- `GET /products/:productId`: Displays a specific product.
- `PUT /products/:productId`: Updates information of a specific product.
- `DELETE /products/:productId`: Deletes a specific product.

### Purchases

- `GET /purchases`: Lists all purchases.
- `POST /purchases`: Creates a new purchase.
- `GET /purchases/:purchaseId`: Displays a specific purchase.
- `PUT /purchases/:purchaseId`: Updates information of a specific purchase.
- `DELETE /purchases/:purchaseId`: Deletes a specific purchase.

### Sales

- `GET /sales`: Lists all sales.
- `POST /sales`: Creates a new sale.
- `GET /sales/:saleId`: Displays a specific sale.
- `PUT /sales/:saleId`: Updates information of a specific sale.
- `DELETE /sales/:saleId`: Deletes a specific sale.

## Project Skeleton

```
Stock API (folder) 
│
├── src
│    ├── configs
│    │     ├── dbConnection.js
│    │     └── swagger.json
│    ├── controllers
│    │     ├── auth.js     
│    │     ├── brand.js          
│    │     ├── category.js          
│    │     ├── firm.js          
│    │     ├── product.js     
│    │     ├── purchase.js     
│    │     ├── sale.js     
│    │     ├── token.js     
│    │     └── user.js
│    ├── helpers
│    │     ├── passwordEncrypt.js    
│    │     └── sync.js 
│    ├── middlewares 
│    │     ├── authentication.js 
│    │     ├── errorHandler.js 
│    │     ├── permissions.js   
│    │     └── queryHandler.js   
│    ├── models                           
│    │     ├── brand.js          
│    │     ├── category.js          
│    │     ├── firm.js          
│    │     ├── product.js     
│    │     ├── purchase.js     
│    │     ├── sale.js     
│    │     ├── token.js     
│    │     └── user.js
│    └── routes                
│          ├── auth.js     
│          ├── brand.js          
│          ├── category.js          
│          ├── document.js          
│          ├── firm.js          
│          ├── index.js          
│          ├── product.js     
│          ├── purchase.js     
│          ├── sale.js     
│          ├── token.js     
│          └── user.js
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── swaggerAutogen.js
├── vercel.json
└── README.md
```