# Money Lending Application

Overview:
This project is a backend service for a money lending application, similar to apps like Slice and KreditBee. The backend is built using Node.js, Express, and MongoDB, with JWT for authentication. The project implements four key APIs to manage user signup, login, user data retrieval, and borrowing money.

Features:
-User Signup: Approve or reject user applications based on age and monthly salary.
-User Login: Authenticate users using email and password with JWT.
-Show User Data: Retrieve user data including purchase power, phone number, email, registration date, DOB, and monthly salary.
-Borrow Money: Allow users to borrow money, update purchase power, and calculate repayment details.

Prerequisites
- Node.js (v12 or higher)
- MongoDB
- Postman (for testing APIs)

Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd money-lending-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB:
   Ensure MongoDB is running on your local machine or provide the correct MongoDB URI in the `mongoose.connect` method in `server.js`.

4. Start the server:
   ```bash
   npm start
   ```
   The server will run on port 3000 by default.


API Endpoints
 1. Approve Application During Signup
- Endpoint: `POST /signup`
- Functionality: Approve or reject the application based on user age and monthly salary. Register the user after verification.
- Request Body:
  ```json
  {
    "phone": "1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "dob": "2000-01-01",
    "monthlySalary": 30000,
    "password": "password123"
  }
  ```
- *Response:*
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "60c72b1f9b1d4b3d88f1e8e5",
      "phone": "1234567890",
      "email": "user@example.com",
      "name": "John Doe",
      "dob": "2000-01-01T00:00:00.000Z",
      "monthlySalary": 30000,
      "status": "Approved",
      "registrationDate": "2023-07-21T07:00:00.000Z"
    }
  }
  ```

2. Login API
- *Endpoint:* `POST /login`
- *Functionality:* Allow users to log in using email and password. Use JWT for authentication.
- *Request Body:*
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- *Response:*
  ```json
  {
    "message": "Login successful",
    "token": "your_jwt_token"
  }
  ```

3. Show User Data
- *Endpoint:* `GET /user`
- *Functionality:* Show user data with specified fields.
- *Headers:*
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- Response:
  ```json
  {
    "_id": "60c72b1f9b1d4b3d88f1e8e5",
    "phone": "1234567890",
    "email": "user@example.com",
    "name": "John Doe",
    "dob": "2000-01-01T00:00:00.000Z",
    "monthlySalary": 30000,
    "purchasePower": 0,
    "registrationDate": "2023-07-21T07:00:00.000Z"
  }
  ```

4. Borrow Money API
- *Endpoint:* `POST /borrow`
- *Functionality:* Allow the user to borrow money, update the purchase power amount, and calculate the repayment details.


- Headers:
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```

- Request Body:
  ```json
  {
    "amount": 5000
  }
  ```

- Response:
  ```json
  {
    "message": "Money borrowed successfully",
    "purchasePower": -5000,
    "monthlyRepayment": 450
  }
  ```

Project Structure:
```
money-lending-app/
├── models/
│   └── User.js
├── routes/
│   ├── signup.js
│   ├── login.js
│   ├── user.js
│   └── borrow.js
├── server.js
└── package.json
```

Models:

- User.js: Defines the user schema and model using Mongoose.

Routes:
- *signup.js:* Handles user registration and validation.
- *login.js:* Manages user login and JWT generation.
- *user.js:* Provides the user data endpoint, protected by JWT authentication.
- *borrow.js:* Implements the borrow money functionality, updating user purchase power and calculating repayment details.

Security Considerations:
- Passwords are hashed using `bcryptjs` before storing in the database.
- JWT is used for secure authentication and to protect endpoints.

Testing:
- Use Postman to test the endpoints by sending the appropriate HTTP requests with the required data.
- Verify the responses to ensure the application behaves as expected.

Screenshots:
 
<img width="959" alt="Froker1" src="https://github.com/user-attachments/assets/e1b23c0f-3323-4de6-ae6d-141910c45e1e">
