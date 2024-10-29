// Fake database of users with hashed passwords
const users = [
    { id: 1, username: 'user1', password: '$2a$10$abcdehashedpassword1' }, // hashed 'password1'
    { id: 2, username: 'user2', password: '$2a$10$abcdehashedpassword2' }, // hashed 'password2'
    { id: 3, username: 'user3', password: '$2a$10$abcdehashedpassword3' }, // hashed 'password3'
];

export  {users}