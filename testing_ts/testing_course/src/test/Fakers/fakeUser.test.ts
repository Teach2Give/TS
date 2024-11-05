import { fakeUsers } from "../../app/fakes/fakeDb";
import { FakeUserService } from "../../app/fakes/FakeUser.service";
import { User } from "../../app/fakes/User.types";

describe('FakeUserService test suite', () => {
    let userService: FakeUserService;
  
    beforeEach(() => {
      userService = new FakeUserService();
    });
  
    it('should return all users', () => {
      const users = userService.getAllUsers();
      expect(users).toEqual(fakeUsers);
      expect(users.length).toBe(3);
    });
  
    it('should return a user by ID', () => {
      const user = userService.getUserById(1);
      expect(user).toBeDefined();
      expect(user?.name).toBe("Alice");
    });
  
    it('should add a new user', () => {
      const newUser: User = { id: 4, name: "Dave", email: "dave@example.com", age: 40 };
      const addedUser = userService.addUser(newUser);
      expect(addedUser).toEqual(newUser);
      expect(userService.getAllUsers().length).toBe(4);
    });
  
    it('should delete a user by ID', () => {
      const isDeleted = userService.deleteUser(2);
      expect(isDeleted).toBe(true);
      expect(userService.getAllUsers().length).toBe(2);
    });
  
    it('should not delete a non-existing user', () => {
      const isDeleted = userService.deleteUser(999);
      expect(isDeleted).toBe(false);
      expect(userService.getAllUsers().length).toBe(3);
    });
  });
  