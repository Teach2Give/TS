import { EmailService } from "../../app/mocks/EmailService";
import { UserService } from "../../app/mocks/UserService";


// Use Jest to mock the EmailService
jest.mock('../../app/mocks/EmailService');

describe('UserService test suite', () => {
  let userService: UserService;
  let emailServiceMock: jest.Mocked<EmailService>;

  beforeEach(() => {
    // Create a mock instance of EmailService
    emailServiceMock = new EmailService() as jest.Mocked<EmailService>;
    userService = new UserService(emailServiceMock);
  });

  it('should add a user and send a welcome email', () => {
    // Arrange
    emailServiceMock.sendWelcomeEmail.mockImplementation(() => {
      console.log('Mocked sendWelcomeEmail called');
    });

    // Act
    const result = userService.addUser({ name: 'John Doe', email: 'john.doe@example.com' });

    // Assert
    expect(result).toBe(true);
    expect(emailServiceMock.sendWelcomeEmail).toHaveBeenCalledTimes(1);
    expect(emailServiceMock.sendWelcomeEmail).toHaveBeenCalledWith('john.doe@example.com');
  });

  it('should not send an email if user is not added', () => {
    // Override addUser logic to simulate failure
    jest.spyOn(userService, 'addUser').mockImplementation(() => false);

    const result = userService.addUser({ name: 'Jane Doe', email: 'jane.doe@example.com' });

    expect(result).toBe(false);
    expect(emailServiceMock.sendWelcomeEmail).not.toHaveBeenCalled();
  });
});
