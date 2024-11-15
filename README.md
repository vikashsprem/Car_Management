# Car Management API Overview

## Base URL

`https://car-management-flame.vercel.app/`

## User Authentication

- **Sign-in** (`POST /api/v1/user/signin`): Logs in a user with email and password.
- **Sign-up** (`POST /api/v1/user/signup`): Registers a new user with name, email, and password.

## Product Management

- **Create Product** (`POST /api/v1/products/create`): Creates a new product (requires JWT).
- **Get All Products** (`GET /api/v1/products/details`): Retrieves all products (requires JWT).
- **Get Product by ID** (`GET /api/v1/products/:id`): Retrieves a single product by its ID.
- **Edit Product by ID** (`PUT /api/v1/products/edit/:id`): Updates an existing product.
- **Delete Product by ID** (`DELETE /api/v1/products/delete/:id`): Deletes a product by its ID.

## Authentication Middleware

JWT authentication is required for all product management routes.

## Error Handling

- **401 Unauthorized**: Missing or invalid JWT token.
- **500 Internal Server Error**: Server-related errors.

## Security

Sensitive routes are protected using JWT authentication.
