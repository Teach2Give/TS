import { LoggerService } from "../../app/spies/LoggerService";
import { UserService } from "../../app/spies/UserService";

describe('UserService with spies', () => {
  let userService: UserService;
  let loggerService: LoggerService;

  beforeEach(() => {
    loggerService = new LoggerService();
    userService = new UserService(loggerService);
  });

  it('should log an error when deleteUser fails', () => {
    // Spy on the logError method of LoggerService
    const logErrorSpy = jest.spyOn(loggerService, 'logError');

    // Act: Call deleteUser with an invalid ID to trigger an error
    const result = userService.deleteUser(-1);

    // Assert: Verify that deleteUser returned false
    expect(result).toBe(false);
    // Assert: Verify that logError was called once with the expected message
    expect(logErrorSpy).toHaveBeenCalledTimes(1);
    expect(logErrorSpy).toHaveBeenCalledWith('Failed to delete user: Invalid user ID');

    // Clean up the spy to avoid side effects in other tests
    logErrorSpy.mockRestore();
  });
});
