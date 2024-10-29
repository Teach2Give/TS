import { users } from "../db/dbFaker";
// Function to find user by username in the fake database
const findUserByUsername = (username:string) => {
    return users.find(user => user.username === username);
};
export {findUserByUsername}