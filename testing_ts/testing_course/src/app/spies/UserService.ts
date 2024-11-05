import { LoggerService } from './LoggerService';

export class UserService {
  private logger: LoggerService;

  constructor(logger: LoggerService) {
    this.logger = logger;
  }

  deleteUser(userId: number): boolean {
    try {
      // Simulate user deletion logic
      if (userId <= 0) throw new Error('Invalid user ID');
      console.log(`User with ID ${userId} deleted.`);
      return true;
    } catch (error) {
      // Check if error is an instance of Error to safely access its properties
      if (error instanceof Error) {
        this.logger.logError(`Failed to delete user: ${error.message}`);
      } else {
        // Handle unexpected non-Error types (optional)
        this.logger.logError('An unknown error occurred while deleting user');
      }
      return false;
    }
  }
}
