import { fakeUsers } from "./fakeDb";
import { User } from "./User.types";

export class FakeUserService {
    private users: User[];
  
    constructor() {
      this.users = [...fakeUsers]; // Ensure a new copy for each instance.
    }
  
    getAllUsers(): User[] {
      return this.users;
    }
  
    getUserById(id: number): User | undefined {
      return this.users.find(user => user.id === id);
    }
  
    addUser(newUser: User): User {
      this.users.push(newUser);
      return newUser;
    }
  
    deleteUser(id: number): boolean {
      const userIndex = this.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        this.users.splice(userIndex, 1);
        return true;
      }
      return false;
    }
  }
  