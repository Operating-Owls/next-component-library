import CryptoJS from 'crypto-js';

// Function to encrypt password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, 'secret_key').toString();
};

// Function to decrypt password
const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, 'secret_key');
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Example user database (replace with your actual user data and backend logic)
let users = [
  { id: 1, username: 'user1', password: encryptPassword('password1') },
  { id: 2, username: 'user2', password: encryptPassword('password2') },
];

// API handler for registering new users
const registerUser = (username, password) => {
  const encryptedPassword = encryptPassword(password);
  const newUser = {
    id: users.length + 1,
    username,
    password: encryptedPassword,
  };
  users.push(newUser);
  return newUser;
};

// API handler for login and registration
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle user login
    const { username, password: encrypted_password_input } = req.body;

    console.log('Received login request:', {
      username,
      password: encrypted_password_input,
    });

    // Find user by username
    const user = users.find((u) => u.username === username);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Decrypt stored password and compare
    const decryptedPassword = decryptPassword(user.password);
    const decrypted_password_input = decryptPassword(encrypted_password_input);

    console.log('Decrypted password:', decryptedPassword);

    if (decrypted_password_input !== decryptedPassword) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If credentials are valid, respond with success message
    console.log('Login successful');
    return res.status(200).json({ message: 'Login successful' });
  } else if (req.method === 'PUT') {
    // Handle user registration
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Register new user
    const newUser = registerUser(username, password);

    return res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } else {
    // Handle other HTTP methods
    console.log('Method Not Allowed');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}