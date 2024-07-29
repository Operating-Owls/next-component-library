import { NextResponse } from 'next/server';
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

// Example users with encrypted passwords
const users = [
    { id: 1, username: 'user1', password: encryptPassword('password1') },
    { id: 2, username: 'user2', password: encryptPassword('password2') },
];

// Function to register new users
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

export async function POST(req) {
    try {
        const { username, password: encryptedPasswordInput } = await req.json();

        console.log('Received login request:', { username, encryptedPasswordInput });

        const user = users.find((u) => u.username === username);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Decrypt stored password and compare
        const decryptedPassword = decryptPassword(user.password);
        const decryptedPasswordInput = decryptPassword(encryptedPasswordInput);

        console.log('Decrypted stored password:', decryptedPassword);
        console.log('Decrypted input password:', decryptedPasswordInput);

        if (decryptedPasswordInput !== decryptedPassword) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const { username, password } = await req.json();

        const existingUser = users.find((u) => u.username === username);
        if (existingUser) {
            return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
        }

        const newUser = registerUser(username, password);
        return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}
