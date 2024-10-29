// who should set the token , server or client  

// In the context of web applications, both the server and the client play roles in handling tokens, but they have different responsibilities:

// 1. The Server Generates and Sets the Token:
// Role: The server is responsible for creating the token (e.g., JWT - JSON Web Token) after a user is authenticated.
// Flow:
// The client sends login credentials (like username and password) to the server.
// The server authenticates the user and, if successful, generates a token (usually containing user data or permissions) and sends it back to the client.
// The server typically stores user-related session data and validates future requests using the token.

// Example using Express.js
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Authenticate user logic (e.g., checking credentials)

    const token = generateToken({ id: user.id }); // Function to generate token
    res.json({ token }); // Send the token back to the client
});


// 2
// The Client Stores and Sends the Token:

// Role: Once the server generates and sends the token, it’s the client’s responsibility to store this token securely (e.g., in local storage, session storage, or cookies).
// Flow:
// After receiving the token from the server, the client stores it for future use.
// For subsequent requests that require authentication, the client attaches the token to the request headers.
// Client-side example using fetch
fetch('https://api.example.com/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
})
    .then(response => response.json())
    .then(data => {
        const token = data.token;
        localStorage.setItem('authToken', token); // Store the token
    });

//Example of Sending a Protected Request:
const token = localStorage.getItem('authToken');

fetch('https://api.example.com/protected-route', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}` // Attach the token
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle the protected resource
    });



//3
// Token Expiration and Refresh:

// Role: The server sets the expiration time for the token, defining how long it is valid.
// Flow:
// Once the token expires, the client can either prompt the user to log in again or, if a refresh token mechanism is in place, use a refresh token to request a new access token from the server.
//1. User Login and Token Generation (Server)
import jwt from 'jsonwebtoken';

// Generate Tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m', // Short expiration time
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d', // Longer expiration time
    });

    return { accessToken, refreshToken };
};

// Login route (example)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Authenticate user (this is just an example; use a real authentication process)
    const user = authenticateUser(username, password);

    if (user) {
        // Generate tokens
        const tokens = generateTokens(user.id);

        // Send tokens to the client
        res.json(tokens);
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});


// 2. Client Stores Tokens:
// The access token is stored (e.g., in LocalStorage or an HTTP-only cookie) and is sent with every request.
// The refresh token is stored securely, typically in an HTTP-only cookie to reduce XSS risk.
//
// Store the tokens in LocalStorage or Cookies
localStorage.setItem('accessToken', data.accessToken);
localStorage.setItem('refreshToken', data.refreshToken);

// OR in HTTP-only cookies (more secure):
document.cookie = `refreshToken=${data.refreshToken}; HttpOnly`;


//3. Protected Route with Access Token (Client)
//For every protected API request, the access token is included in the Authorization header.
const accessToken = localStorage.getItem('accessToken');

fetch('/api/protected', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    },
})
    .then(response => {
        if (response.status === 401) {
            // Token might be expired
            handleTokenExpiration();
        } else {
            return response.json();
        }
    });


// 4. Token Expiration Handling and Refresh (Client)
//When the access token expires, the client uses the refresh token to request a new access token from the server.
const handleTokenExpiration = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    const response = await fetch('/api/token/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
        const data = await response.json();

        // Store the new access token
        localStorage.setItem('accessToken', data.accessToken);
    } else {
        // Refresh token is also expired, prompt user to log in
        window.location.href = '/login';
    }
};

//5. Refresh Token Endpoint (Server)
// The server validates the refresh token and issues a new access token if the refresh token is valid.
app.post('/api/token/refresh', (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).send('Refresh token required');
    }

    // Verify refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid refresh token');
        }

        // Generate a new access token
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m', // New short-lived access token
        });

        res.json({ accessToken });
    });
});


// 6. Token Expiration Strategy:
// Access Token: Short-lived (e.g., 15 minutes) to minimize the window of attack if compromised.
// Refresh Token: Longer-lived (e.g., 7 days) to allow the client to request new access tokens without needing to log in again frequently.

// Summary of Token Expiration and Refresh Flow:
// Server generates and sends both access token and refresh token on login.
// Client stores the tokens securely and uses the access token for authenticated requests.
// If the access token expires, the client uses the refresh token to request a new access token without re-logging in.
// The server verifies the refresh token and issues a new access token when needed.
// If the refresh token is also expired, the client will prompt the user to log in again.

// Security Considerations:

// Server-Side: The server should validate the token on each request to ensure it’s valid and hasn’t been tampered with.
// Client-Side: The client should securely store tokens and handle security threats like XSS (Cross-Site Scripting).

// In a real-world application, managing access and refresh tokens is crucial for maintaining secure user authentication and session management. Here's a breakdown of how you can handle these tokens, store them in sessions, and what you can do with them.

// Access Tokens vs. Refresh Tokens
// Access Tokens:

// Purpose: Access tokens are short-lived tokens that grant the user access to protected resources (e.g., API endpoints).
// Lifetime: Typically valid for a short period (e.g., 15 minutes to a few hours).
// Storage: Should be stored securely, usually in memory or in HTTP-only cookies to prevent XSS attacks.
// Usage: Sent with each request to authenticate the user.
// Refresh Tokens:

// Purpose: Refresh tokens are long-lived tokens used to obtain new access tokens without requiring the user to log in again.
// Lifetime: Can be valid for a longer period (e.g., days, weeks, or even months).
// Storage: Stored securely, usually in an HTTP-only cookie or a secure storage mechanism.
// Usage: Used to request new access tokens when the current access token expires.
// Implementation Steps
// 1. Storing Tokens in Sessions
// To manage sessions effectively, you can use server-side session management libraries such as express-session or similar tools. Here’s an example using express-session:

// 1. Storing Tokens in Sessions
// To manage sessions effectively, you can use server-side session management libraries such as express-session or similar tools. Here’s an example using express-session:
npm install express-session
