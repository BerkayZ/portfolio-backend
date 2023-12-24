## Portfolio Backend 

The Portfolio Backend project serves as the backend infrastructure for a personal portfolio website. It is designed to handle various functionalities such as project management, contact form submissions, and user authentication for administrators. The project provides a robust and secure foundation for managing and showcasing projects, receiving contact form submissions, and administering the portfolio content.

## Technologies Used

The project leverages the following key technologies:

- Node.js: The server-side JavaScript runtime environment that powers the backend.
- Express.js: A minimal and flexible Node.js web application framework used for building robust APIs.
- Sequelize: An ORM (Object-Relational Mapping) for Node.js that supports PostgreSQL, providing an abstraction layer for database interactions.
- PostgreSQL: A powerful, open-source relational database system for data storage.
- JWT (JSON Web Token): Used for secure authentication and authorization processes.
- Bcrypt: A library for hashing passwords, enhancing security for user authentication.
- Multer: Middleware for handling multipart/form-data, enabling file uploads.
- Axios: A promise-based HTTP client for making HTTP requests to external APIs.
- CORS (Cross-Origin Resource Sharing): Middleware for enabling cross-origin resource sharing.
- Dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.
- Express Rate Limit: Middleware for rate-limiting requests to protect against abuse and improve security.
- Mocha and Chai: Testing frameworks for creating and running test cases.
- Supertest: A library for testing HTTP assertions, used in conjunction with Mocha for API testing.

These technologies collectively contribute to the creation of a scalable, secure, and efficient backend for managing and presenting a personal portfolio. The project emphasizes clean code practices, security, and ease of maintenance.


This repository contains automated tests for the portfolio backend API using Supertest. The tests cover various scenarios for both normal users and administrators.

## Setup

Make sure to install the required dependencies before running the tests:

npm install

## Running the Tests

To run the tests, use the following command:

npm test

## Test Scenarios

### Normal User Tests

#### GET Requests

- **Get Projects**
  - Endpoint: `/projects/get`


#### POST Requests

- **Send Contact Form**
  - Endpoint: `/contacts/post`
  - Payload:
    ```json
    {
        "name": "System test",
        "email": "system@test.com",
        "subject": "System Test Subject",
        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in pulvinar lorem. Donec arcu sem, maximus id consequat vel, molestie a tortor. Proin ligula eros, hendrerit vel consectetur id, finibus sed ipsum. Nunc ullamcorper a ex sit amet tempor. Quisque commodo massa in nulla commodo, vitae dapibus magna suscipit. Vestibulum gravida eros quis diam varius feugiat."
    }
    ```


### Admin User Tests

#### GET Requests

Before running the following tests, authentication is required. The authentication token is obtained by logging in with the credentials of an admin user.

- **GET All Projects**
  - Endpoint: `/projects/getAll`
  - Headers: `Authorization: Bearer <token>`

- **GET Contact Submissions**
  - Endpoint: `/contacts/get`
  - Headers: `Authorization: Bearer <token>`

#### POST Requests

Before running the following tests, authentication is required. The authentication token is obtained by logging in with the credentials of an admin user.

- **Add New Project**
  - Endpoint: `/projects/add`
  - Headers: `Authorization: Bearer <token>`
  - Payload:
    ```json
    {
        "active": true,
        "slug": "sys-test",
        "title": "Test Project",
        "description": "Test desc",
        "image": "https://picsum.photos/200/300",
        "content": "<p>content</p>"
    }
    ```

- **Update Project**
  - Endpoint: `/projects/update/:projectId`
  - Headers: `Authorization: Bearer <token>`
  - Payload:
    ```json
    {
        "active": true,
        "slug": "system-test-update",
        "title": "Test Project",
        "description": "Test desc",
        "image": "https://picsum.photos/200/300",
        "content": "<p>content</p>"
    }
    ```

## .env File Configuration

Create a `.env` file in the root directory of your project with the following configurations:

```env
PORT=3399
DB_USER="berkayz"
DB_PASS="1234"
DB_HOST="127.0.0.1"
DB_PORT="5432"
DB_NAME="portfolio"
SYNC_DATABASE=false //* Database will be truncated if it's true
SECRET_KEY="secret"
BASE_URL="http://localhost:3399"
```


## Author
Berkay Zelyurt

## License
This project is licensed under the Creative Comms Attribution 4.0 License - see the LICENSE.md file for details.
