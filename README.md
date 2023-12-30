# MERN-Login-Page-with-Authentication![SIGNUP](https://github.com/MuhammadImaz/MERN-Login-Page-with-Authentication/assets/101148427/6dfb2908-73a7-491f-b07b-fd48eb9f1b06)
![login](https://github.com/MuhammadImaz/MERN-Login-Page-with-Authentication/assets/101148427/164fd731-9a31-4c1a-80ee-9de06afbb3d1)
![home](https://github.com/MuhammadImaz/MERN-Login-Page-with-Authentication/assets/101148427/ad017343-2579-4631-97a8-785cde5cb175)

The typical workflow for implementing a MERN-based login system with JWT involves:

User Registration: Creating an endpoint (in Node.js using Express.js) to handle user registration by receiving and storing user credentials (username, email, password) in the MongoDB database.

User Authentication: Implementing a login mechanism where users provide detils (username/email and password). The server validates the credentials against the data stored in the database and generates a JWT if the credentials are valid.

JWT Generation: Upon successful authentication, the server generates a JWT containing user information and sends it back to the client.

JWT Verification: Protecting certain routes/endpoints by verifying the received JWT from the client on subsequent requests to those protected routes.

Front-end Integration: In the React front end, handling the login form submission, storing the JWT securely (usually in local storage or cookies), and using it in subsequent requests to access authenticated routes.

